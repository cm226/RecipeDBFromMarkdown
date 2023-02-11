import { Neo4JDriver } from "./Neo4JDriver";

export class RecipeDBEntry {
  private _name: string;
  private _driver: Neo4JDriver;

  public _ingreds: string[] | null = null;

  public get Ingredients() {
    return this._ingreds;
  }

  public set Ingredients(v: string[] | null) {
    this._ingreds = v;
  }

  constructor() {}

  public async init(driver: Neo4JDriver, name: string) {
    this._driver = driver;
    this._name = name;

    const result = await driver.query(
      "MATCH(:RECIPE{name:$name})-[:INCLUDES]->(i:INGREDIENT) RETURN i",
      { name }
    );

    for (const record of result.records) {
      console.log(record);
    }
  }

  public async commit() {
    if (this._ingreds === null) return;

    const edges = this._ingreds?.map(
      (ingred) => `($name)-[:INCLUDES {quantity : ?}]-> (${ingred})`
    );
    const q = edges?.join(",");
    const result = await this._driver.query(q, { name: this._name });
  }
}
