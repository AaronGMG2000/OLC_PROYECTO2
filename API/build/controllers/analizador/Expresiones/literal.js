"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("./expresion");
class Literal extends expresion_1.Expresion {
    constructor(linea, columna, valor, Tipo) {
        super(linea, columna, valor, Tipo);
    }
    getValor(arbol, tabla) {
        return this;
    }
}
exports.default = Literal;
//# sourceMappingURL=literal.js.map