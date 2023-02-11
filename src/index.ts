import express, { Express, Request, Response } from "express";
import { Neo4JDriver } from "./db/Neo4JDriver.js";
import { RecipeDBEntry } from "./db/RecipeDBEntry.js";
import { Recipe } from "./recipe.js";

const app: Express = express();
const port = 8000;

const neo4J = new Neo4JDriver();

app.get("/", async (req: Request, res: Response) => {
  const recipe = new Recipe();
  recipe.parse("testData/Toad in the hole.md").then(() => {
    res.send(recipe.FileName + " " + recipe.Ingredients);
  });

  const dbEntry = new RecipeDBEntry();
  await dbEntry.init(neo4J, recipe.FileName);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

neo4J.close();
