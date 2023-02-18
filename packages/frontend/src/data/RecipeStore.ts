import { Recipe } from "@shopping/types";

export class RecipeStore {
  public _recipes: Recipe[] = [];

  public get Recipes() {
    return this._recipes;
  }
  async populate() {
    const recipesResp = await fetch("/recipes");
    this._recipes = (await recipesResp.json()) as Recipe[];
  }
}
