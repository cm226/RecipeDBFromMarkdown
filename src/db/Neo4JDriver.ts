import neo4j from "neo4j-driver";
import { Driver } from "neo4j-driver-core";

export class Neo4JDriver {
  private _driver: Driver;

  constructor() {
    this._driver = neo4j.driver(
      "neo4j://localhost:7687/neo4j",
      neo4j.auth.basic("neo4j", "sometestpassword")
    );
  }

  async close() {
    await this._driver.close();
  }

  async query(q: string, params: unknown) {
    const session = this._driver.session();
    let result = undefined;
    try {
      result = await session.run(q, params);
    } finally {
      await session.close();
    }

    return result;
  }
}
