"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
class LLAMADA extends instruccion_1.Instruccion {
    constructor(linea, columna, exp) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        if (this.exp) {
            var result = this.exp.getValor(arbol, tabla);
        }
        //ERROR
    }
}
exports.default = LLAMADA;
//# sourceMappingURL=llamada.js.map