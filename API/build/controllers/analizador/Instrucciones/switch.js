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
                let correcto = false;
                for (let caso of this.Case) {
                    if (typeof (caso) !== typeof ("")) {
                        let val = caso.Case.getValor();
                        if (val.Tipo.tipos !== tipo_1.tipos.ERROR) {
                            if (variable.Tipo.tipos === val.Tipo.tipos ||
                                variable.Tipo.tipos === tipo_1.tipos.ENTERO && val.Tipo.tipos === tipo_1.tipos.DOBLE ||
                                (variable.Tipo.tipos === tipo_1.tipos.DOBLE && val.Tipo.tipos === tipo_1.tipos.ENTERO)) {
                                if (val.valor === variable.valor || correcto) {
                                    correcto = true;
                                    for (let elemento of caso.INS) {
                                        if (typeof (elemento) !== typeof ("")) {
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
            }
            if (this.Default) {
                for (let elemento of this.Default) {
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
                            else if (res.nombre === "BREAK") {
                                if (arbol.pilaCiclo.length > 0) {
                                    arbol.pilaCiclo.pop();
                                    return;
                                }
                                else {
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            else if (res.nombre === "CONTINUE") {
                                if (arbol.pilaCiclo.length > 1) {
                                    arbol.pilaCiclo.pop();
                                    return res;
                                }
                                else {
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            return;
                        }
                    }
                }
            }
            arbol.pilaCiclo.pop();
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "error al leer la variable condicional", this.linea, this.columna));
        return;
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("SWITCH");
        nodo.agregarHijo("SWITCH");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.Variable.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        let cas = new nodoAST_1.nodoAST("CASOS");
        let raiz = cas;
        let x = 0;
        if (this.Case) {
            for (let caso of this.Case) {
                if (typeof (caso) !== typeof ("")) {
                    cas.agregarHijo("CASE");
                    cas.agregarHijo(undefined, undefined, caso.Case.getNodo());
                    cas.agregarHijo(":");
                    if (caso.INS) {
                        let inst = new nodoAST_1.nodoAST("INSTRUCCIONES");
                        for (let instruccion of caso.INS) {
                            if (typeof (instruccion) !== typeof ("")) {
                                inst.agregarHijo(undefined, undefined, instruccion.getNodo());
                            }
                        }
                        cas.agregarHijo(undefined, undefined, inst);
                    }
                    x++;
                    if (x !== this.Case.length) {
                        let case2 = new nodoAST_1.nodoAST("CASOS");
                        cas.agregarHijo(undefined, undefined, case2);
                        cas = case2;
                    }
                }
            }
        }
        if (this.Default) {
            let def = new nodoAST_1.nodoAST("DEFAULT");
            for (let elemento of this.Default) {
                if (typeof (elemento) !== typeof ("")) {
                    def.agregarHijo(undefined, undefined, elemento.getNodo());
                }
            }
            if (x == 0) {
                cas = new nodoAST_1.nodoAST("DEFAULT");
            }
            else {
                cas.agregarHijo(undefined, undefined, def);
            }
        }
        if (this.Case || this.Default) {
            nodo.agregarHijo(undefined, undefined, raiz);
        }
        nodo.agregarHijo("}");
        return nodo;
    }
}
exports.default = SWITCH;
//# sourceMappingURL=switch.js.map