"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAST_1 = require("../Abstract/nodoAST");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const simbolo_1 = __importDefault(require("../tablaSimbolo/simbolo"));
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
const expresion_1 = require("./expresion");
const literal_1 = __importDefault(require("./literal"));
const variable_1 = __importDefault(require("./variable"));
class NATIVA extends expresion_1.Expresion {
    constructor(linea, columna, nombre, exp) {
        super(linea, columna, undefined, new tipo_1.default(tipo_1.tipos.CADENA));
        this.nombre = nombre;
        this.exp = exp;
    }
    getValor(arbol, tabla) {
        let valor = this.exp.getValor(arbol, tabla);
        if (valor) {
            let comp = undefined;
            if (this.exp instanceof variable_1.default) {
                comp = tabla.get(this.exp.nombre);
            }
            switch (this.nombre.toUpperCase()) {
                case "LENGTH":
                    if (!(valor.valor instanceof Array) && typeof (valor.valor) !== typeof ("")) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "El valor ingresado no es una lista o vector o string", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    }
                    return new literal_1.default(this.linea, this.columna, valor.valor.length, tipo_1.tipos.ENTERO);
                case "TRUNCATE":
                    if (typeof (valor.valor) !== typeof (1)) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "El valor ingresado no es un int o un double", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    }
                    return new literal_1.default(this.linea, this.columna, Math.trunc(valor.valor), tipo_1.tipos.ENTERO);
                case "ROUND":
                    if (typeof (valor.valor) !== typeof (1)) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "El valor ingresado no es un int o un double", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    }
                    return new literal_1.default(this.linea, this.columna, Math.round(valor.valor), tipo_1.tipos.ENTERO);
                case "TYPEOF":
                    switch (valor.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            if (comp instanceof simbolo_1.default) {
                                if (comp.LOV === "VECTOR") {
                                    return new literal_1.default(this.linea, this.columna, "INT[]", tipo_1.tipos.CADENA);
                                }
                                else {
                                    return new literal_1.default(this.linea, this.columna, "LIST<INT>", tipo_1.tipos.CADENA);
                                }
                            }
                            return new literal_1.default(this.linea, this.columna, "INT", tipo_1.tipos.CADENA);
                        case tipo_1.tipos.BOOLEANO:
                            if (comp instanceof simbolo_1.default) {
                                if (comp.LOV === "VECTOR") {
                                    return new literal_1.default(this.linea, this.columna, "BOOLEAN[]", tipo_1.tipos.CADENA);
                                }
                                else {
                                    return new literal_1.default(this.linea, this.columna, "LIST<BOOLEAN>", tipo_1.tipos.CADENA);
                                }
                            }
                            return new literal_1.default(this.linea, this.columna, "BOOLEAN", tipo_1.tipos.CADENA);
                        case tipo_1.tipos.CARACTER:
                            if (comp instanceof simbolo_1.default) {
                                if (comp.LOV === "VECTOR") {
                                    return new literal_1.default(this.linea, this.columna, "CHAR[]", tipo_1.tipos.CADENA);
                                }
                                else {
                                    return new literal_1.default(this.linea, this.columna, "LIST<CHAR>", tipo_1.tipos.CADENA);
                                }
                            }
                            return new literal_1.default(this.linea, this.columna, "CHAR", tipo_1.tipos.CADENA);
                        case tipo_1.tipos.DOBLE:
                            if (comp instanceof simbolo_1.default) {
                                if (comp.LOV === "VECTOR") {
                                    return new literal_1.default(this.linea, this.columna, "DOUBLE[]", tipo_1.tipos.CADENA);
                                }
                                else {
                                    return new literal_1.default(this.linea, this.columna, "LIST<DOUBLE>", tipo_1.tipos.CADENA);
                                }
                            }
                            return new literal_1.default(this.linea, this.columna, "DOUBLE", tipo_1.tipos.CADENA);
                        case tipo_1.tipos.CADENA:
                            if (comp instanceof simbolo_1.default) {
                                if (comp.LOV === "VECTOR") {
                                    return new literal_1.default(this.linea, this.columna, "STRING[]", tipo_1.tipos.CADENA);
                                }
                                else {
                                    return new literal_1.default(this.linea, this.columna, "LIST<STRING>", tipo_1.tipos.CADENA);
                                }
                            }
                            return new literal_1.default(this.linea, this.columna, "STRING", tipo_1.tipos.CADENA);
                        default:
                            return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
                    }
                case "TOSTRING":
                    if (valor.valor instanceof literal_1.default) {
                        if (valor.valor.valor instanceof Array) {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede convertir un vector o lista en string", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
                        }
                    }
                    return new literal_1.default(this.linea, this.columna, String(valor.valor), tipo_1.tipos.CADENA);
                case "TOCHARARRAY":
                    if (typeof (valor.valor) !== typeof ("")) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "El valor ingresado no es una string", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    }
                    return new literal_1.default(this.linea, this.columna, Array.from(valor.valor), tipo_1.tipos.CARACTER);
                default:
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "función inexistente", this.linea, this.columna));
                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
            }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "El valor indicado no existe", this.linea, this.columna));
        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("NATIVA");
        nodo.agregarHijo(this.nombre.toUpperCase());
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}
exports.default = NATIVA;
//# sourceMappingURL=nativas.js.map