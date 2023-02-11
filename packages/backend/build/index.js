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
import { DataLayer } from "./data/DataLayer";
const app = express();
const port = 8000;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new DataLayer();
    yield data.parse("testData");
    const json = data.Recipes.map((r) => {
        return JSON.stringify({
            name: r.FileName,
            ingreds: JSON.stringify(r.Ingredients),
        });
    }).join(",");
    res.send(json);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
