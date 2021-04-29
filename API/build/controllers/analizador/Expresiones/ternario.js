"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const Entorno_1 = __importDefault(require("../tablaSimbolo/Entorno"));
const tipo_1 = require("../tablaSimbolo/tipo");
class IF extends instruccion_1.Instruccion {
    constructor(linea, columna, condicion1, bloque1, bloque2, elseif) {
        super(linea, columna);
        this.condicion1 = condicion1;
        this.bloque1 = bloque1;
        this.bloque2 = bloque2;
        this.elseIf = elseif;
    }
    ejecutar(arbol, tabla) {
        let condicion = this.condicion1.getValor(arbol, tabla);
        if (condicion.Tipo.tipos === tipo_1.tipos.BOOLEANO) {
            if (condicion.valor) {
                let Nuevo_Entorno = new Entorno_1.default("IF", tabla);
                for (let elemento of this.bloque1) {
                    if (typeof (elemento) !== typeof ("")) {
                        let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                        if (typeof (res) === typeof ([])) {
                            if (res.nombre === "RETURN") {
                                if (arbol.pilaFuncion.length > 0) {
                                    return res;
                                }
                                else {
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                }
                            }
                            else if (res.nombre === "BREAK") {
                                if (arbol.pilaCiclo.length > 0) {
                                    return res;
                                }
                                else {
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            else if (res.nombre === "CONTINUE") {
                                if (arbol.pilaCiclo.length > 0) {
                                    return res;
                                }
                                else {
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            return;
                        }
                    }
                    else {
                        console.log(arbol.errores);
                    }
                }
            }
            else if (this.elseIf) {
                let res = this.elseIf.ejecutar(arbol, tabla);
                if (typeof (res) === typeof ([])) {
                    return res;
                }
            }
            else if (this.bloque2) {
                let Nuevo_Entorno = new Entorno_1.default("ELSE", tabla);
                for (let elemento of this.bloque2) {
                    if (typeof (elemento) !== typeof ("")) {
                        let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                        if (typeof (res) === typeof ([])) {
                            if (res.nombre === "RETURN") {
                                if (arbol.pilaFuncion.length > 0) {
                                    return res;
                                }
                                else {
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                }
                            }
                            else if (res.nombre === "BREAK") {
                                if (arbol.pilaCiclo.length > 0) {
                                    return res;
                                }
                                else {
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            else if (res.nombre === "CONTINUE") {
                                if (arbol.pilaCiclo.length > 0) {
                                    return res;
                                }
                                else {
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            return;
                        }
                    }
                    else {
                        console.log(arbol.errores);
                    }
                }
            }
        }
        //ERROR
    }
}
exports.default = IF;
//# sourceMappingURL=ternario.js.map