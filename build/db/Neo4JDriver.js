var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import neo4j from "neo4j-driver";
export class Neo4JDriver {
    constructor() {
        this._driver = neo4j.driver("neo4j://localhost:7687/neo4j", neo4j.auth.basic("neo4j", "neo4j"));
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._driver.close();
        });
    }
    query(q, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = this._driver.session();
            let result = undefined;
            try {
                result = yield session.run(q, params);
            }
            finally {
                yield session.close();
            }
            return result;
        });
    }
}
