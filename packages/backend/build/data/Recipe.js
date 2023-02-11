var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFileSync } from "fs";
import { remark } from "remark";
import path from "path";
export class Recipe {
    constructor() {
        this._ingredients = [];
        this._filename = null;
    }
    get Ingredients() {
        return [...this._ingredients];
    }
    get FileName() {
        var _a;
        return (_a = this._filename) !== null && _a !== void 0 ? _a : "NotSet!";
    }
    findIngredients(child) {
        if (child.type === "paragraph") {
            if (child.children.length === 1 &&
                child.children[0].type === "text" &&
                child.children[0].value === "#ingredients") {
                return true;
            }
        }
        return false;
    }
    extractIngredients(child) {
        if (child.type !== "list") {
            throw new Error("The ingred list was not a list! failed to parse");
        }
        const parsedIngredients = [];
        for (const ingred of child.children) {
            const paragraph = ingred.children[0];
            if (paragraph.type !== "paragraph")
                throw new Error("failed to parse");
            const text = paragraph.children[0];
            if (text.type !== "text")
                throw new Error("failed to parse");
            parsedIngredients.push(text.value);
        }
        return parsedIngredients;
    }
    parse(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filename !== null)
                throw new Error("Recipe already used");
            const filepath = path.parse(filename);
            this._filename = filepath.name;
            const buffer = readFileSync(path.join(filepath.dir, filepath.base));
            const parsedRecipe = yield remark().parse(buffer.toString());
            let childFound = false;
            for (const child of parsedRecipe.children) {
                if (!childFound)
                    childFound = this.findIngredients(child);
                else {
                    this._ingredients = this.extractIngredients(child);
                    break;
                }
            }
        });
    }
}
