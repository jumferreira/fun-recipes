<template>
  <div class="search" :class="searchHasResult ? 'search--active' : ''">
    <div class="flex relative">
      <input
          type="text"
          class="input input--large"
          placeholder="Search recipes"
          v-model="searchQuery"
          @input="search"
      >
      <button v-if="searchQuery" @click="clearSearch">
        <font-awesome-icon icon="fa-solid fa-xmark" class="search__icon"/>
      </button>
    </div>


    <template v-if="searchHasResult">
      <div v-if="hasCategory" class="search__results">
        <ul>
          <li
              v-for="(item, key, index) in results"
              :key="`search-result-category-${index}`"
              class="search__results-item"
          >
            <p class="search__results-item-category">{{ key }}</p>
            <button
                v-for="(result, index) in item"
                :key="`search-result-item-${index}`"
                class="search__results-item-meal"
                @click="selectItem(result.idMeal)"
            >
              {{ result.strMeal }}
            </button>
          </li>
        </ul>
      </div>

      <div v-if="!hasCategory" class="search__results">
        <ul>
          <li
              v-for="(result, index) in results"
              :key="`search-result-item-${index}`"
              class="search__results-item"
          >
            <button
                class="search__results-item-meal"
                @click="selectItem(result.idMeal)"
            >
              {{ result.strMeal }}
            </button>
          </li>
        </ul>
      </div>

    </template>
  </div>
</template>

<script>
export default {
  name: 'search-bar',
  props: {
    results: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array|Object,
    },
    hasCategory: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    searchQuery: null,
  }),
  computed: {
    searchHasResult() {
      return this.searchQuery && Object.keys(this.results).length > 0;
    },
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery);
    },
    selectItem(id) {
      this.$emit('item-selected', id);
    },
    clearSearch() {
      this.searchQuery = '';
      this.$emit('clear-results');
    },
  },
};
</script>
