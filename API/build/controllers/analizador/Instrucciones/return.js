"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
class RETURN extends instruccion_1.Instruccion {
    constructor(linea, columna, exp) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        let valor = this.exp.getValor(arbol, tabla);
        if (valor) {
            return { nombre: "RETURN", retorno: valor };
        }
        return { nombre: "RETURN", retorno: undefined };
    }
}
exports.default = RETURN;
//# sourceMappingURL=return.js.map