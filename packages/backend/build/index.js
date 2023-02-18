var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFile, writeFileSync } from "atomically";
import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { DataLayer } from "./data/DataLayer";
const stateFile = "./state.json";
const app = express();
const port = 8000;
// fix this, probably
app.use(express.static(path.join("../frontend", "build")));
app.use(express.json());
app.get("/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new DataLayer();
    yield data.parse("testData");
    const json = data.Recipes.map((r) => {
        return JSON.stringify({
            name: r.FileName,
            ingreds: r.Ingredients,
        });
    }).join(",");
    res.send(`[${json}]`);
}));
app.post("/save", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const state = req.body;
    writeFileSync(stateFile, JSON.stringify(state));
}));
app.get("/restore", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const state;
        res.send("[]");
    });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
