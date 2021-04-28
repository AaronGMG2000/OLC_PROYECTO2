"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const Entorno_1 = __importDefault(require("../tablaSimbolo/Entorno"));
const tipo_1 = require("../tablaSimbolo/tipo");
class SWITCH extends instruccion_1.Instruccion {
    constructor(linea, columna, Variable, Case, Default) {
        super(linea, columna);
        this.Variable = Variable;
        this.Case = Case;
        this.Default = Default;
    }
    ejecutar(arbol, tabla) {
        let variable = this.Variable.getValor(arbol, tabla);
        if (variable.Tipo.tipos !== tipo_1.tipos.ERROR) {
            let Nuevo_Entorno = new Entorno_1.default("IF", tabla);
            arbol.pilaCiclo.push("SWITCH");
            if (this.Case) {
                for (let caso of this.Case) {
                    let val = caso.Case.getValor();
                    if (val.Tipo.tipos !== tipo_1.tipos.ERROR) {
                        if (variable.Tipo.tipos === val.Tipo.tipos ||
                            variable.Tipo.tipos === tipo_1.tipos.ENTERO && val.Tipo.tipos === tipo_1.tipos.DOBLE ||
                            (variable.Tipo.tipos === tipo_1.tipos.DOBLE && val.Tipo.tipos === tipo_1.tipos.ENTERO)) {
                            if (val.valor === variable.valor) {
                                for (let elemento of caso.INS) {
                                    let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                                    if (typeof (res) === typeof ([])) {
                                        if (res.nombre === "RETURN") {
                                            if (arbol.pilaFuncion.length > 0) {
                                                arbol.pilaCiclo.pop();
                                                return res;
                                            }
                                            else {
                                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                            }
                                        }
                                        else if (res.nombre === "BREAK") {
                                            if (arbol.pilaCiclo.length > 0) {
                                                arbol.pilaCiclo.pop();
                                                return;
                                            }
                                            else {
                                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                                            }
                                        }
                                        else if (res.nombre === "CONTINUE") {
                                            if (arbol.pilaCiclo.length > 1) {
                                                arbol.pilaCiclo.pop();
                                                return res;
                                            }
                                            else {
                                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                            }
                                        }
                                        return;
                                    }
                                }
                            }
                        }
                        else {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Constante de Case incorrecta", this.linea, this.columna));
                            break;
                        }
                    }
                    else {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Constante de Case incorrecta", this.linea, this.columna));
                        break;
                    }
                }
            }
            if (this.Default) {
                for (let elemento of this.Default) {
                    let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                    if (typeof (res) === typeof ([])) {
                        if (res.nombre === "RETURN") {
                            if (arbol.pilaFuncion.length > 0) {
                                arbol.pilaCiclo.pop();
                                return res;
                            }
                            else {
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                            }
                        }
                        else if (res.nombre === "BREAK") {
                            if (arbol.pilaCiclo.length > 0) {
                                arbol.pilaCiclo.pop();
                                return;
                            }
                            else {
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                            }
                        }
                        else if (res.nombre === "CONTINUE") {
                            if (arbol.pilaCiclo.length > 1) {
                                arbol.pilaCiclo.pop();
                                return res;
                            }
                            else {
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                            }
                        }
                        return;
                    }
                }
            }
            arbol.pilaCiclo.pop();
        }
        // ERROR
    }
}
exports.default = SWITCH;
//# sourceMappingURL=switch.js.map