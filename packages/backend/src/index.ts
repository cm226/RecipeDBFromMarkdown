import express, { Express, Request, Response } from "express";
import { DataLayer } from "./data/DataLayer";

const app: Express = express();
const port = 8000;

app.get("/", async (req: Request, res: Response) => {
  const data = new DataLayer();
  await data.parse("testData");
  const json = data.Recipes.map((r) => {
    return JSON.stringify({
      name: r.FileName,
      ingreds: JSON.stringify(r.Ingredients),
    });
  }).join(",");

  res.send(json);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
