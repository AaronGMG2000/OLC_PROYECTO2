"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {IndexController} from '../controllers/indexController';
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // this.router.get('/cargarTemporal',IndexController.index);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
//# sourceMappingURL=IndexRoutes.js.map