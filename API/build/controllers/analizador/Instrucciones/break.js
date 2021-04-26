"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
class BREAK extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(arbol, tabla) {
        return { nombre: "BREAK", retorno: undefined };
        //ERROR
    }
}
exports.default = BREAK;
//# sourceMappingURL=break.js.map