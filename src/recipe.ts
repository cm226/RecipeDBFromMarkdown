import { readFileSync } from "fs";
import { remark } from "remark";
import type { Content } from "mdast";
import path from "path";

export class Recipe {
  private _ingredients: string[] = [];
  private _filename: string | null = null;

  public get Ingredients() {
    return [...this._ingredients];
  }

  public get FileName() {
    return this._filename ?? "NotSet!";
  }

  findIngredients(child: Content) {
    if (child.type === "paragraph") {
      if (
        child.children.length === 1 &&
        child.children[0].type === "text" &&
        child.children[0].value === "#ingredients"
      ) {
        return true;
      }
    }
    return false;
  }

  extractIngredients(child: Content) {
    if (child.type !== "list") {
      throw new Error("The ingred list was not a list! failed to parse");
    }

    const parsedIngredients = [];

    for (const ingred of child.children) {
      const paragraph = ingred.children[0];
      if (paragraph.type !== "paragraph") throw new Error("failed to parse");

      const text = paragraph.children[0];
      if (text.type !== "text") throw new Error("failed to parse");

      parsedIngredients.push(text.value);
    }

    return parsedIngredients;
  }

  async parse(filename: string) {
    if (this._filename !== null) throw new Error("Recipe already used");

    const filepath = path.parse(filename);
    this._filename = filepath.name;

    const buffer = readFileSync(path.join(filepath.dir, filepath.base));
    const parsedRecipe = await remark().parse(buffer.toString());

    let childFound = false;
    for (const child of parsedRecipe.children) {
      if (!childFound) childFound = this.findIngredients(child);
      else {
        this._ingredients = this.extractIngredients(child);
        break;
      }
    }
  }
}
