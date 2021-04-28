"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const Entorno_1 = __importDefault(require("../tablaSimbolo/Entorno"));
const tipo_1 = require("../tablaSimbolo/tipo");
class DOWHILE extends instruccion_1.Instruccion {
    constructor(linea, columna, condicion1, bloque1) {
        super(linea, columna);
        this.condicion1 = condicion1;
        this.bloque1 = bloque1;
    }
    ejecutar(arbol, tabla) {
        let condicion = this.condicion1.getValor(arbol, tabla);
        if (condicion.Tipo.tipos === tipo_1.tipos.BOOLEANO) {
            var Nuevo_Entorno = new Entorno_1.default("DO", tabla);
            let cont = false;
            let bre = false;
            arbol.pilaCiclo.push("ciclo");
            //DO
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
            }
            if (bre) {
                arbol.pilaCiclo.pop();
                return;
            }
            condicion = this.condicion1.getValor(arbol, tabla);
            //WHILE
            while (condicion.valor) {
                Nuevo_Entorno = new Entorno_1.default("DOWHILE", tabla);
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
        }
        //ERROR
    }
}
exports.default = DOWHILE;
//# sourceMappingURL=dowhile.js.map