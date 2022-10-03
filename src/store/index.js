import Vue from 'vue';
export default {
  namespaced: false,

  state: {
    originalMeals: [],
    meals: [],
    meal: {},
    instructions: [],
  },

  getters: {},

  mutations: {
    'SET_ORIGINAL_MEALS' (state, originalMeals) {
      state.originalMeals = originalMeals;
    },

    'PUSH_TO_ORIGINAL_MEALS' (state, data) {
      state.originalMeals.push(data);
    },

    'SET_MEALS' (state, meals) {
      state.meals = meals;
    },

    'SET_MEAL' (state, meal) {
      state.meal = meal;
    },

    'SET_INSTRUCTIONS' (state, instructions) {
      state.instructions = instructions;
    },

    'CLEAR_SEARCH_VARIABLES' (state) {
      Vue.set(state, 'meals', []);
      Vue.set(state, 'originalMeals', []);
    },

    'CLEAR_SIMPLE_VARIABLES' (state) {
      Vue.set(state, 'meal', {});
      Vue.set(state, 'instructions', []);
    },
  },

  actions: {
    setOriginalMeals ({ commit }, originalMeals) {
      commit('SET_ORIGINAL_MEALS', originalMeals);
    },

    pushToOriginalMeals ({ commit }, data) {
      commit('PUSH_TO_ORIGINAL_MEALS', data);
    },

    setMeals ({ commit }, meals) {
      commit('SET_MEALS', meals);
    },

    setMeal ({ commit }, meal) {
      commit('SET_MEAL', meal);
    },

    setInstructions ({ commit }, instructions) {
      commit('SET_INSTRUCTIONS', instructions);
    },

    clearSearchVariables ({ commit }) {
      commit('CLEAR_SEARCH_VARIABLES');
    },

    clearSimpleVariables ({ commit }) {
      commit('CLEAR_SIMPLE_VARIABLES');
    },
  },
};
