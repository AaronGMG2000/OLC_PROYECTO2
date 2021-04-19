"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entorno_1 = __importDefault(require("./Entorno"));
class ArbolAST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno_1.default();
        this.errores = new Array();
    }
    updateConsola(update) {
        this.consola = `${this.consola}${update}\n`;
    }
}
exports.default = ArbolAST;
//# sourceMappingURL=ArbolAST.js.map