<template>
  <div id="app">
    <main class="main">
      <header class="header">
        <div class="header__logo">
          <a href="/">
            <img class="header__image" src="../img/header_logo.png" alt="recipes">
          </a>
        </div>

        <div class="header__search">
          <search-bar
              :results="meals"
              :hasCategory="true"
              @search="getMealByName"
              @item-selected="getMealById"
              @clear-results="clearSearchVariablesData"
          ></search-bar>
        </div>

        <div class="header__buttons">
          <button @click="openModal">advanced search</button>
          <button @click="generatePDF">
            <font-awesome-icon icon="fa-solid fa-print" class="text-2xl"/>
          </button>
        </div>
      </header>

      <div class="recipe">
        <div class="recipe__content">
          <p class="recipe__content-category flex items-center">
            {{ meal.strCategory }}
            <img
                :src="`https://countryflagsapi.com/svg/${getCountryName(meal.strArea)}`"
                :alt="`${getCountryName(meal.strArea)} flag`"
                :title="`${getCountryName(meal.strArea)} flag`"
            />
          </p>

          <h1 class="recipe__content-name">{{ meal.strMeal }}</h1>

          <img class="recipe__content-image" :src="meal.strMealThumb" alt="">

          <div class="recipe__content-method">
            <h3 class="recipe__content-title">How to prepare</h3>

            <ul class="recipe__content-preparation">
              <li
                  v-for="(step, index) in instructions"
                  :key="`instruction-${index + 1}`"
              >
                <div class="flex">
                  <p class="recipe__content-subtitle">Step {{ index + 1 }}</p>
                  <p class="recipe__content-text">{{ step }}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div class="recipe__information">
          <h2 class="recipe__information-title">Ingredients</h2>
          <ul class="recipe__information-list">
            <li
                v-for="index in 20"
                :key="index"
            >
              {{ getIngredientItem(index) }}
            </li>
          </ul>

          <p v-if="meal.strYoutube" class="recipe__information-title">Recipe video</p>
          <iframe
              v-if="meal.strYoutube"
              class="recipe__information-video"
              :src="videoUrl"
              :title="meal.strMeal"
          ></iframe>

          <a
              v-if="meal.strSource"
              :href="meal.strSource"
              class="recipe__information-title pt-8 underline block text-center"
              target="_blank"
          >
            Recipe Source
          </a>

        </div>
      </div>

      <modal
          name="searchModal"
          :width="365"
          :height="360"
      >
        <div class="modal">
          <div class="modal_header">
            <p class="modal_title">Search for categories and/or categories</p>

            <button class="modal_close" @click="closeModal()">
              <font-awesome-icon icon="fa-solid fa-xmark"/>
            </button>
          </div>

          <div class="modal_body">
            <search-bar
                :results="meals"
                @search="getCompleteSearchResults"
                @item-selected="getMealById"
                @clear-results="clearSearchVariablesData"
            ></search-bar>
          </div>
        </div>
      </modal>
    </main>
  </div>
</template>
<script>
import axios from 'axios';
import { jsPDF } from "jspdf";
import SearchBar from './components/Search';
import { debounce as _debounce, groupBy as _groupBy } from 'lodash';
import { DEMONYM_AND_COUNTRIES } from '@/utils/constants/countries';
export default {
  name: 'App',
  components: {
    'search-bar': SearchBar,
  },
  data: () => ({
    baseUrl: 'https://www.themealdb.com/api/json/v1/1',
    meal: {},
    meals: [],
    originalMeals: [],
    instructions: [],
    line: 0,
  }),
  computed: {
    videoUrl() {
      const data = this.meal.strYoutube.split('watch?v=');
      return `${data[0]}embed/${data[1]}`;
    },
  },
  mounted() {
    this.getRandomMeal();
  },
  methods: {
    getRandomMeal() {
      axios.get(`${this.baseUrl}/random.php`).then((response) => {
        this.clearVariablesData()
        this.meal = response.data.meals[0];
        this.parseInstructions();
      })
    },

    getMealById(id) {
      axios.get(`${this.baseUrl}/lookup.php?i=${id}`).then((response) => {
        this.clearVariablesData();
        this.meal = response.data.meals[0];
        this.parseInstructions();
        this.closeModal();
        this.clearSearch();
      })
    },

    getMealByName: _debounce(function (searchQuery) {
      axios.get(`${this.baseUrl}/search.php?s=${searchQuery}`).then((response) => {
        if (response.data.meals) {
          this.originalMeals = response.data.meals;
          this.meals = _groupBy(this.originalMeals, 'strCategory');
        }
      })
    }, 500),

    getCompleteSearchResults: _debounce(function (searchQuery) {
      if (!searchQuery) {
        return;
      }

      this.clearSearchVariablesData();
      // Search for main ingredient
      this.searchWithMultipleTypes('filter.php?i', searchQuery);

      // Search for category
      this.searchWithMultipleTypes('filter.php?c', searchQuery);
    }, 500),

    searchWithMultipleTypes(parameter, searchQuery) {
      axios.get(`${this.baseUrl}/${parameter}=${searchQuery}`).then((response) => {
        if (response.data.meals) {
          this.originalMeals.push(response.data.meals);
          this.meals = this.originalMeals.flat();
        }
      })
    },

    getIngredientItem(index) {
      if (!this.meal[`strMeasure${index}`] || !this.meal[`strIngredient${index}`]) {
        return;
      }

      return `${this.meal[`strMeasure${index}`]} ${this.meal[`strIngredient${index}`]}`;
    },

    generatePDF() {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text(this.meal.strMeal, 10, 10);
      doc.setFontSize(16);
      doc.text(`Category: ${this.meal.strCategory}`, 10, 20);
      doc.text('Ingredients', 10, 35);
      doc.setFontSize(12);

      this.line = 40;
      for(let i = 0; i < 20; i ++) {
        if (this.getIngredientItem(i)) {
          this.line += 7;
          doc.text(`${this.getIngredientItem(i)}`, 10, this.line);
        }
      }

      doc.setFontSize(16);
      doc.text('How to prepare', 10, this.line += 10);
      doc.setFontSize(12);
      doc.text(`${this.meal.strInstructions.replace("\r\n", ' ')}`, 10, this.line += 10, { maxWidth: 190 });
      doc.save("recipe.pdf");
    },

    getCountryName(demonym){
      if (!DEMONYM_AND_COUNTRIES[demonym]) {
        return;
      }

      return DEMONYM_AND_COUNTRIES[demonym].toLowerCase();
    },

    clearSearch() {
      this.searchQuery = '';
      this.clearSearchVariablesData();
    },
    clearSearchVariablesData() {
      this.meals = [];
      this.originalMeals = [];
    },
    clearVariablesData() {
      this.meal = {};
      this.instructions = [];
    },
    parseInstructions() {
      if (!this.meal.strInstructions) {
        return ;
      }

      this.instructions = this.meal.strInstructions.split("\r\n").filter(item => item && !item.match(/(step|STEP|Step) \d+$/g) && !item.match(/^[0-9.]+$/g));
    },
    openModal () {
      this.$modal.show('searchModal');
    },
    closeModal () {
      this.$modal.hide('searchModal');
    },
  },
}
</script>
