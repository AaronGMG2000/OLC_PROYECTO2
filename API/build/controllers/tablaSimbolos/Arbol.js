"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tablaSimbolos_1 = __importDefault(require("./tablaSimbolos"));
class Arbol {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new tablaSimbolos_1.default();
        this.errores = new Array();
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    setInstrucciones(instrucciones) {
        this.instrucciones = instrucciones;
    }
    getConsola() {
        return this.consola;
    }
    setConsola(consola) {
        this.consola = consola;
    }
    updateConsola(update) {
        this.consola = `${this.consola}${update}\n`;
    }
    getGlobal() {
        return this.global;
    }
    setGlobal(tabla) {
        this.global = tabla;
    }
}
exports.default = Arbol;
//# sourceMappingURL=Arbol.js.map