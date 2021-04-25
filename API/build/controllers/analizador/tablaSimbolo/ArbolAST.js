"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entorno_1 = __importDefault(require("./Entorno"));
class ArbolAST {
    constructor(instrucciones) {
        this.errores = new Array();
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno_1.default();
    }
    updateConsola(update) {
        this.consola = `${this.consola}${update}\n`;
    }
    EjecutarBloque() {
        for (let elemento of this.instrucciones) {
            if (typeof (elemento) !== typeof ("")) {
                elemento.ejecutar(this, this.global);
            }
            else {
                console.log(this.errores);
            }
        }
    }
}
exports.default = ArbolAST;
//# sourceMappingURL=ArbolAST.js.map