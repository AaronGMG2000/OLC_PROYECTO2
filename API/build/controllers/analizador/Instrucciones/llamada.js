"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = require("../Abstract/nodoAST");
class LLAMADA extends instruccion_1.Instruccion {
    constructor(linea, columna, exp) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        if (this.exp) {
            return this.exp.getValor(arbol, tabla);
        }
        //ERROR
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("");
        console.log(this.exp);
        nodo = this.exp.getNodo();
        nodo.agregarHijo(";");
        return nodo;
    }
}
exports.default = LLAMADA;
//# sourceMappingURL=llamada.js.map