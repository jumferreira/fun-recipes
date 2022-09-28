<template>
  <div id="app">
    <main class="main">
      <header class="header">
        <div class="header__logo">
          <a href="">
            Recipes
<!--            <img class="header__image" src="./assets/img/logo.png" alt="recipes">-->
          </a>
        </div>

        <div class="header__search">
          <div class="search" :class="searchHasResult ? 'search--active' : ''">
            <input
                type="text"
                class="input input--large"
                placeholder="Search recipes"
                v-model="searchQuery"
                @input="getMealByName"
            >

            <div v-if="searchHasResult" class="search__results">
              <ul>
                <li
                    v-for="(item, key, index) in meals"
                    :key="`search-result-category-${index}`"
                    class="search__results-item"
                >
                  <p class="search__results-item-category">{{ key }}</p>
                  <button
                      v-for="(result, index) in item"
                      :key="`search-result-item-${index}`"
                      class="search__results-item-meal"
                      @click="selectMeal(result.idMeal)"
                  >
                    {{ result.strMeal }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="header__buttons"></div>
      </header>

      <div class="recipe">
        <div class="recipe__content">
          <p class="recipe__content-category">{{ meal.strCategory }}</p>
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
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { debounce as _debounce, groupBy as _groupBy } from 'lodash';
import axios from 'axios';
export default {
  name: 'App',
  components: {},
  data: () => ({
    baseUrl: 'https://www.themealdb.com/api/json/v1/1',
    meal: {},
    meals: [],
    originalMeals: [],
    instructions: [],
    searchQuery: null,
  }),
  computed: {
    videoUrl() {
      const data = this.meal.strYoutube.split('watch?v=');
      return `${data[0]}embed/${data[1]}`;
    },
    searchHasResult() {
      return this.searchQuery && Object.keys(this.meals).length > 0;
    },
  },
  mounted() {
    // this.getMealById();
    this.getRandomMeal();
  },
  methods: {
    getRandomMeal() {
      // eslint-disable-next-line no-undef
      axios.get(`${this.baseUrl}/random.php`).then((response) => {
        this.meal = {};
        this.instructions = [];
        this.meal = response.data.meals[0];
        this.instructions = this.meal.strInstructions.split("\r\n").filter(item => item && !item.match(/(step|STEP|Step) \d+$/g) && !item.match(/^[0-9.]+$/g));
        console.log('------ response ---------', response);
      })
    },
    getMealById() {
      // eslint-disable-next-line no-undef
      axios.get(`${this.baseUrl}/lookup.php?i=52997`).then((response) => {
        this.meal = {};
        this.instructions = [];
        this.meal = response.data.meals[0];
        this.instructions = this.meal.strInstructions.split("\r\n").filter(item => item && !item.match(/(step|STEP|Step) \d+$/g) && !item.match(/^[0-9.]+$/g));
        console.log('------ response ---------', response);
      })
    },
    getMealByName: _debounce(function () {
      // eslint-disable-next-line no-undef
      axios.get(`${this.baseUrl}/search.php?s=${this.searchQuery}`).then((response) => {
        console.log('------ response ---------', response.data);

        this.meals = [];
        this.originalMeals = [];
        this.originalMeals = response.data.meals;
        this.meals = _groupBy(response.data.meals, 'strCategory');
      })
    }, 500),

    selectMeal(id) {
      this.meal = this.originalMeals.filter((meal) => meal.idMeal === id)[0];
      this.instructions = this.meal.strInstructions.split("\r\n").filter(item => item && !item.match(/(step|STEP|Step) \d+$/g) && !item.match(/^[0-9.]+$/g));
      this.searchQuery = null;
    },

    getIngredientItem(index) {
      if (!this.meal[`strMeasure${index}`] || !this.meal[`strIngredient${index}`]) {
        return;
      }

      return `${this.meal[`strMeasure${index}`]} ${this.meal[`strIngredient${index}`]}`;
    },
  },
}
</script>
