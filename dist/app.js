"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faker_1 = __importDefault(require("faker"));
const node_cache_1 = __importDefault(require("node-cache"));
const app = express_1.default();
const port = 3000;
const myCache = new node_cache_1.default();
app.get('/', (req, res) => {
    let realCount = myCache.get("realCount") ? myCache.get("realCount") : 0;
    let type;
    if (req.query.hasOwnProperty('count')) {
        type = 'count';
        const paramCount = +req.query.count;
        realCount += paramCount;
        myCache.set("realCount", realCount, 10000);
    }
    else if (req.query.hasOwnProperty('reset')) {
        type = 'reset';
        realCount = +req.query.reset;
        myCache.set("realCount", realCount, 10000);
    }
    const sentence = `${faker_1.default.lorem.sentence(3)} - ${type} ${realCount}`;
    res.send(sentence);
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map