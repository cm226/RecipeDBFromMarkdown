export interface Ingredient {
  name: string;
  recipe: string;
}

export interface Recipe {
  name: string;
  ingreds: string[];
}

export interface state {
  ingredients: Ingredient[];
  recipes: Recipe[];
}
