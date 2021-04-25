"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const tipo_1 = require("../tablaSimbolo/tipo");
class Imprimir extends instruccion_1.Instruccion {
    constructor(linea, columna, exp) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        if (this.exp) {
            var result = this.exp.getValor(arbol, tabla);
            if (result.Tipo.tipos != tipo_1.tipos.ERROR) {
                if (arbol.consola === "") {
                    arbol.consola += result.valor;
                }
                else {
                    arbol.consola += "\n" + result.valor;
                }
            }
        }
        //ERROR
    }
}
exports.default = Imprimir;
//# sourceMappingURL=imprimir.js.map