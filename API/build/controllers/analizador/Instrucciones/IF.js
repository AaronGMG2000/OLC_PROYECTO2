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
        if (condicion.Tipo.tipos !== tipo_1.tipos.ERROR) {
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
                    }
                }
                return;
            }
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "la variable indicada en la condición no existe", this.linea, this.columna));
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "la variable indicada en la condición no existe", this.linea, this.columna));
        return;
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("IF");
        nodo.agregarHijo("IF");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.condicion1.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        if (this.bloque1) {
            let nodo1 = new nodoAST_1.nodoAST("INSTRUCCIONES");
            for (let element of this.bloque1) {
                if (typeof (element) !== typeof ("")) {
                    nodo1.agregarHijo(undefined, undefined, element.getNodo());
                }
            }
            nodo.agregarHijo(undefined, undefined, nodo1);
        }
        nodo.agregarHijo("}");
        if (this.elseIf) {
            let nodoe = new nodoAST_1.nodoAST("ELSE IF");
            nodoe.agregarHijo("ELSE");
            nodoe.agregarHijo(undefined, this.elseIf.getNodo().getHijos(), undefined);
            nodo.agregarHijo(undefined, undefined, nodoe);
        }
        if (this.bloque2) {
            let nodo2 = new nodoAST_1.nodoAST("ELSE");
            nodo2.agregarHijo("ELSE");
            nodo2.agregarHijo("{");
            let nodo1 = new nodoAST_1.nodoAST("INSTRUCCIONES");
            for (let element of this.bloque2) {
                if (typeof (element) !== typeof ("")) {
                    nodo1.agregarHijo(undefined, undefined, element.getNodo());
                }
            }
            nodo2.agregarHijo(undefined, undefined, nodo1);
            nodo2.agregarHijo("}");
            nodo.agregarHijo(undefined, undefined, nodo2);
        }
        return nodo;
    }
}
exports.default = IF;
//# sourceMappingURL=IF.js.map