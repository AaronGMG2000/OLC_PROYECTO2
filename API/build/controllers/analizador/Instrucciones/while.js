"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = require("../Abstract/nodoAST");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const Entorno_1 = __importDefault(require("../tablaSimbolo/Entorno"));
const tipo_1 = require("../tablaSimbolo/tipo");
class WHILE extends instruccion_1.Instruccion {
    constructor(linea, columna, condicion1, bloque1) {
        super(linea, columna);
        this.condicion1 = condicion1;
        this.bloque1 = bloque1;
    }
    ejecutar(arbol, tabla) {
        let condicion = this.condicion1.getValor(arbol, tabla);
        if (condicion.Tipo.tipos === tipo_1.tipos.BOOLEANO) {
            let cont = false;
            let bre = false;
            arbol.pilaCiclo.push("ciclo");
            while (condicion.valor) {
                let Nuevo_Entorno = new Entorno_1.default("WHILE", tabla);
                for (let elemento of this.bloque1) {
                    if (typeof (elemento) !== typeof ("")) {
                        let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                        if (typeof (res) === typeof ([])) {
                            if (res.nombre === "RETURN") {
                                if (arbol.pilaFuncion.length > 0) {
                                    arbol.pilaCiclo.pop();
                                    return res;
                                }
                                else {
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                }
                            }
                            if (res.nombre === "CONTINUE") {
                                cont = true;
                                break;
                            }
                            else if (res.nombre === "BREAK") {
                                bre = true;
                                break;
                            }
                        }
                    }
                    else {
                        console.log(arbol.errores);
                    }
                }
                if (cont) {
                    cont = false;
                    continue;
                }
                if (bre) {
                    arbol.pilaCiclo.pop();
                    break;
                }
                condicion = this.condicion1.getValor(arbol, tabla);
            }
            arbol.pilaCiclo.pop();
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Se esperaba un booleano en la condición while", this.linea, this.columna));
        return;
        //ERROR
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("WHILE");
        nodo.agregarHijo("WHILE");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.condicion1.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        if (this.bloque1) {
            let nodo2 = new nodoAST_1.nodoAST("INSTRUCCIONES");
            for (let element of this.bloque1) {
                if (typeof (element) !== typeof ("")) {
                    nodo2.agregarHijo(undefined, undefined, element.getNodo());
                }
            }
            nodo.agregarHijo(undefined, undefined, nodo2);
        }
        nodo.agregarHijo("}");
        return nodo;
    }
}
exports.default = WHILE;
//# sourceMappingURL=while.js.map