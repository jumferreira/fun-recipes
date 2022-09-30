import { mount } from '@vue/test-utils';
import { createFactory } from '@/utils/tests/factories';
import App from '../App.vue';

const meal = {"idMeal": "53029", "strMeal": "Mulukhiyah", "strDrinkAlternate": null, "strCategory": "Beef", "strArea": "Egyptian", "strInstructions": "Saute the onions in the 3-4 tablespoons olive oil\r\nAdd the beef cubes or the chicken cutlets, sear for 3-4 min on each side\r\nAdd 1 liter of water or just enough to cover the meat\r\nCook over medium heat until the meat is done (I usually do this in the pressure cooker and press them for 5 min)\r\n\r\nAdd the frozen mulukhyia and stir until it thaws completely and then comes to a boil\r\n\r\nIn another pan add the 1/4 to 1/2 cup of olive oil and the cloves of garlic and cook over medium low heat until you can smell the garlic (don’t brown it, it will become bitter)\r\n\r\nAdd the oil and garlic to the mulukhyia and lower the heat and simmer for 5-10 minutes\r\nAdd salt to taste\r\n\r\nServe with a generous amount of lemon juice.\r\n\r\nYou can serve it with some short grain rice or some pita bread", "strMealThumb": "https://www.themealdb.com/images/media/meals/x372ug1598733932.jpg", "strTags": null, "strYoutube": "https://www.youtube.com/watch?v=vWc5JzgAkIQ", "strIngredient1": "Mulukhiyah", "strIngredient2": "Onion", "strIngredient3": "Beef", "strIngredient4": "Salt", "strIngredient5": "Water", "strIngredient6": "Garlic Clove", "strIngredient7": "Olive Oil", "strIngredient8": "", "strIngredient9": "", "strIngredient10": "", "strIngredient11": "", "strIngredient12": "", "strIngredient13": "", "strIngredient14": "", "strIngredient15": "", "strIngredient16": "", "strIngredient17": "", "strIngredient18": "", "strIngredient19": "", "strIngredient20": "", "strMeasure1": "800g", "strMeasure2": "1 chopped", "strMeasure3": "300g", "strMeasure4": "1 tsp ", "strMeasure5": "1 Litre", "strMeasure6": "1", "strMeasure7": "1/2 cup ", "strMeasure8": " ", "strMeasure9": " ", "strMeasure10": " ", "strMeasure11": " ", "strMeasure12": " ", "strMeasure13": " ", "strMeasure14": " ", "strMeasure15": " ", "strMeasure16": " ", "strMeasure17": " ", "strMeasure18": " ", "strMeasure19": " ", "strMeasure20": " ", "strSource": "https://chefindisguise.com/2017/05/15/mulukhiyah-a-stew-fit-for-royals/", "strImageSource": null, "strCreativeCommonsConfirmed": null, "dateModified": null };

const factory = createFactory(({ props, options }) => mount(App, {
  propsData: { ...props },
  ...options,
}));

describe('Testing Fun-recipes app', () => {

  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('should mount the component', async () => {
    const wrapper = factory();
    expect(wrapper.find('.header')).toBeDefined();
    expect(wrapper.find('.recipe')).toBeDefined();
    wrapper.destroy();
  });

  it('should show correct title information', async () => {
    const wrapper = factory();
    wrapper.setData({ meal });

    const recipeName = wrapper.find('.recipe__content-name');
    expect(recipeName.exists()).toBe(true);
    expect(wrapper.vm.meal.strMeal).toBe(meal.strMeal);
    wrapper.destroy();
  });

  it('should show correct category information', async () => {
    const wrapper = factory();
    wrapper.setData({ meal });

    const recipeCategory = wrapper.find('.recipe__content-category');
    expect(recipeCategory.exists()).toBe(true);
    expect(wrapper.vm.meal.strCategory).toBe(meal.strCategory);
    wrapper.destroy();
  });

  it('should show correct section title', async () => {
    const wrapper = factory();
    wrapper.setData({ meal });

    const recipeHowToTitle = wrapper.find('.recipe__content-title');
    expect(recipeHowToTitle.exists()).toBe(true);
    expect(recipeHowToTitle.text()).toBe('How to prepare');
    wrapper.destroy();
  });
});
