<template>
  <div id="app">
    <main class="main">
      <header class="header">
        <div class="header__logo">
          <a href="">
            <img class="header__image" src="./assets/img/logo.png" alt="recipes">
          </a>
        </div>

        <div class="header__search">
          <input type="text" class="input input--large" placeholder="Search recipes">
        </div>

        <div class="header__buttons"></div>

      </header>

      <div class="recipe">
        <div class="recipe__content">
          <p class="recipe__content-name">{{ meal.strMeal }}</p>

        </div>

        <div class="recipe__information">
          <ul>
            <li
                v-for="index in 20"
                :key="index"
            >
              {{ getIngredientItem(index) }}
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  components: {},
  data: () => ({
    baseUrl: 'https://www.themealdb.com/api/json/v1/1',
    meal: {},
  }),
  mounted() {
    this.getRandomMeal();
  },
  methods: {
    getRandomMeal() {
      // eslint-disable-next-line no-undef
      axios.get(`${this.baseUrl}/random.php`).then((response) => {
        this.meal = response.data.meals[0];
        console.log('------ response ---------', response);
      })
    },
    async getData() {
      // eslint-disable-next-line no-undef
      await axios.get()
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
