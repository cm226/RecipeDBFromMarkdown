import { readFile, readFileSync, writeFile, writeFileSync } from "atomically";
import express, { Express, Request, Response } from "express";
import { promises as fs } from "fs";
import path from "path";
import { DataLayer } from "./data/DataLayer";
import { state } from "@shopping/types";

const stateFile = "./state.json";
const app: Express = express();
const port = 8000;

export interface Ingredient {
  name: string;
  recipe: string;
}

interface payload {
  shoppingList: Ingredient[];
  selected: string[];
}

// fix this, probably
app.use(express.static(path.join("../frontend", "build")));
app.use(express.json());

app.get("/recipes", async (req: Request, res: Response) => {
  const data = new DataLayer();
  await data.parse("testData");
  const json = data.Recipes.map((r) => {
    return JSON.stringify({
      name: r.FileName,
      ingreds: r.Ingredients,
    });
  }).join(",");

  res.send(`[${json}]`);
});

app.post("/save", async (req: Request, res: Response) => {
  try {
    const state = req.body as payload;
    writeFileSync(stateFile, JSON.stringify(state));
  } catch (e) {
    console.error("Error while saving: " + e);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

app.get("/restore", async (req: Request, res: Response) => {
  fs.access(stateFile)
    .then(() => {
      readFile(stateFile)
        .then((file) => {
          res.send(file);
        })
        .catch(() => {
          res.sendStatus(500);
        });
    })
    .catch(() => {
      const state: state = { ingredients: [], recipes: [] };
      res.send(JSON.stringify(state));
    });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
