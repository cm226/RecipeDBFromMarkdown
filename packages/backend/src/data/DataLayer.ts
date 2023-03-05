import { promises as fs } from "fs";
import Path from "path";
import { Recipe } from "./Recipe.js";

export class DataLayer {
  private _recipes: Recipe[] = [];

  public get Recipes() {
    return this._recipes;
  }

  async parse(folder: string) {
    const filenames = await fs.readdir(folder);
    for (const file of filenames) {
      if (Path.extname(file) === ".md") {
        const recipe = new Recipe();
        await recipe.parse(Path.join(folder, file));
        this._recipes.push(recipe);
      }
    }
  }
}
