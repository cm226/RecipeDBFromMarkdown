var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { Neo4JDriver } from "./db/Neo4JDriver.js";
import { Recipe } from "./recipe.js";
const app = express();
const port = 8000;
const neo4J = new Neo4JDriver();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = new Recipe();
    recipe.parse("testData/Toad in the hole.md").then(() => {
        res.send(recipe.FileName + " " + recipe.Ingredients);
    });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
neo4J.close();
