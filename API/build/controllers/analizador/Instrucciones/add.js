"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = require("../Abstract/nodoAST");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const tipo_1 = require("../tablaSimbolo/tipo");
class ADD extends instruccion_1.Instruccion {
    constructor(linea, columna, ID, exp) {
        super(linea, columna);
        this.ast = false;
        this.ID = ID;
        this.exp = exp;
    }
    ejecutar(arbol, tabla) {
        var comprobar = tabla.get(this.ID);
        if (comprobar.tipo.tipos !== tipo_1.tipos.ERROR) {
            let valor = this.exp.getValor(arbol, tabla);
            if (valor.Tipo.tipos === tipo_1.tipos.ERROR) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Error al obtener expresión de asignación", this.linea, this.columna));
                return;
            }
            if (valor.Tipo.tipos !== comprobar.tipo.tipos) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "El tipo de la lista y la expresión no coinciden", this.linea, this.columna));
                return;
            }
            this.ast = true;
            comprobar.valor.valor.push(valor.valor);
            comprobar.CANTIDAD++;
            tabla.update(this.ID, comprobar);
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "no existe la lista indicada", this.linea, this.columna));
        return;
        // ERROR
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("ADD");
        let nodo2 = new nodoAST_1.nodoAST("ID");
        nodo2.agregarHijo(this.ID);
        nodo.agregarHijo(undefined, undefined, nodo2);
        nodo.agregarHijo("add");
        nodo.agregarHijo(".");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}
exports.default = ADD;
//# sourceMappingURL=add.js.map