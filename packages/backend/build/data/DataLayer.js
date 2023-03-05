var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promises as fs } from "fs";
import Path from "path";
import { Recipe } from "./Recipe.js";
export class DataLayer {
    constructor() {
        this._recipes = [];
    }
    get Recipes() {
        return this._recipes;
    }
    parse(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            const filenames = yield fs.readdir(folder);
            for (const file of filenames) {
                if (Path.extname(file) === ".md") {
                    const recipe = new Recipe();
                    yield recipe.parse(Path.join(folder, file));
                    this._recipes.push(recipe);
                }
            }
        });
    }
}
