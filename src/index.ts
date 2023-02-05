import express, { Express, Request, Response } from "express";
import { Recipe } from "./recipe";

const app: Express = express();
const port = 8000;

app.get("/", async (req: Request, res: Response) => {
  const recipe = new Recipe();
  recipe.parse("testData/Toad in the hole.md").then(() => {
    res.send(recipe.FileName + " " + recipe.Ingredients);
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
