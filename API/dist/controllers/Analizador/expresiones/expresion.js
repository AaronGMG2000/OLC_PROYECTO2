"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
const nodo_1 = require("../Abstract/nodo");
class Expresion extends nodo_1.node {
    constructor(linea, columna, valor, tipo) {
        super(linea, columna);
        this.Tipo = tipo;
        this.valor = valor;
    }
}
exports.Expresion = Expresion;
//# sourceMappingURL=expresion.js.map