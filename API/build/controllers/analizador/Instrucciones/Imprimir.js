"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = require("../Abstract/nodoAST");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const tipo_1 = require("../tablaSimbolo/tipo");
class Imprimir extends instruccion_1.Instruccion {
    constructor(linea, columna, exp) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        if (this.exp) {
            var result = this.exp.getValor(arbol, tabla);
            if (result) {
                if (result.Tipo.tipos != tipo_1.tipos.ERROR) {
                    if (result.valor instanceof Array) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede imprimir una lista o vector", this.linea, this.columna));
                        return;
                    }
                    this.ast = true;
                    if (arbol.consola === "") {
                        arbol.consola += result.valor;
                    }
                    else {
                        arbol.consola += "\n" + result.valor;
                    }
                }
            }
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("PRINT");
        nodo.agregarHijo("print");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo(";");
        return nodo;
    }
}
exports.default = Imprimir;
//# sourceMappingURL=imprimir.js.map