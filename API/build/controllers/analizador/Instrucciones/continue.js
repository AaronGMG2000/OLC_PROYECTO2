"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
class CONTINUE extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(arbol, tabla) {
        return { nombre: "CONTINUE", retorno: undefined };
        //ERROR
    }
}
exports.default = CONTINUE;
//# sourceMappingURL=continue.js.map