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
exports.OperadorAritmetico = void 0;
const nodoAST_1 = require("../Abstract/nodoAST");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
const expresion_1 = require("./expresion");
const literal_1 = __importDefault(require("./literal"));
class Aritmetica extends expresion_1.Expresion {
    constructor(operador, linea, columna, valor, Tipo, iz, der) {
        super(linea, columna, valor, iz.Tipo);
        if (der) {
            this.ExpresionDerecha = der;
        }
        this.ExpresionIzquierda = iz;
        this.operador = operador;
    }
    getValor(arbol, tabla) {
        var izquierda;
        var derecha;
        if (this.ExpresionIzquierda) {
            izquierda = this.ExpresionIzquierda.getValor(arbol, tabla);
        }
        if (this.ExpresionDerecha) {
            derecha = this.ExpresionDerecha.getValor(arbol, tabla);
        }
        switch (this.operador) {
            case OperadorAritmetico.SUMA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.BOOLEANO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.CADENA:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.CADENA);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                case tipo_1.tipos.CARACTER:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor.charCodeAt(), tipo_1.tipos.ENTERO);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.BOOLEANO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CADENA:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.CADENA);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                case tipo_1.tipos.CARACTER:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor.charCodeAt(), tipo_1.tipos.DOBLE);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                            break;
                        case tipo_1.tipos.BOOLEANO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CADENA:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar suma entre 2 booleanos", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CARACTER:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar suma entre un booleano y un caracter", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                            break;
                        case tipo_1.tipos.CADENA:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.CADENA);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.CADENA);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                case tipo_1.tipos.BOOLEANO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.CADENA);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                case tipo_1.tipos.CADENA:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.CADENA);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                case tipo_1.tipos.CARACTER:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.CADENA);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                            break;
                        case tipo_1.tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor.charCodeAt() + derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor.charCodeAt() + derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CADENA:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.CADENA);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                case tipo_1.tipos.CARACTER:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.CADENA);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, tipo_1.tipos.CADENA);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar suma entre un booleano y un caracter", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                            break;
                        default:
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    }
                }
                break;
            case OperadorAritmetico.RESTA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.BOOLEANO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.CARACTER:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor.charCodeAt(), tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una resta entre int y boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.BOOLEANO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor.charCodeAt(), tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una resta entre un double y un boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                            break;
                        case tipo_1.tipos.BOOLEANO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una resta entre un booleano y un caracter", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una resta entre un booleano y un string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una resta entre 2 booleanos", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipo_1.tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor.charCodeAt() - derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor.charCodeAt() - derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una resta entre 2 caracteres", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una resta entre un caracter y un string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una resta entre un caracter y un boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipo_1.tipos.BOOLEANO:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una resta con un string", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        default:
                            break;
                    }
                }
                else if (!derecha && izquierda) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                            return new literal_1.default(this.linea, this.columna, -izquierda.valor, tipo_1.tipos.ENTERO);
                        case tipo_1.tipos.DOBLE:
                            this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                            return new literal_1.default(this.linea, this.columna, -izquierda.valor, tipo_1.tipos.DOBLE);
                        case tipo_1.tipos.CADENA:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar negación a un string", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        case tipo_1.tipos.BOOLEANO:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar negación a un booleano", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        case tipo_1.tipos.CARACTER:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar negación a un caracter", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        default:
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            break;
                    }
                }
                else {
                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
                break;
            case OperadorAritmetico.MULTIPLICACION:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una multiplicación entre int y string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una multiplicación entre int y un booleano", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una multiplicación double y cadena", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una multiplicación entre double y boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                        case tipo_1.tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor.charCodeAt() * derecha.valor, tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.DOBLE:
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor.charCodeAt() * derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una multiplicación entre caracteres", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una multiplicación entre caracter y string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una multiplicación entre caracter y boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                        case tipo_1.tipos.CADENA:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una multiplicación con un string", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        case tipo_1.tipos.BOOLEANO:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una multiplicación con un boolean", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        default:
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    }
                }
                else {
                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
            case OperadorAritmetico.DIVISION:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR DIVISIÓN CON 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.DOBLE:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR DIVISIÓN CON 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR DIVISIÓN CON 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor.charCodeAt(), tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una división entre un int y un string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una división entre un int y un boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR DIVISIÓN CON 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.DOBLE:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR DIVISIÓN CON 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR DIVISIÓN CON 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor.charCodeAt(), tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una división entre un double y un string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una división entre un double y un boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipo_1.tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR DIVISIÓN CON 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor.charCodeAt() / derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.DOBLE:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR DIVISIÓN CON 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor.charCodeAt() / derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una división entre un caracter y un string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CARACTER:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una división entre un 2 caracter", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una división entre un caracter y un boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipo_1.tipos.CADENA:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una división con string", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        case tipo_1.tipos.BOOLEANO:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una división con boolean", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        default:
                            break;
                    }
                }
                else {
                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
                break;
            case OperadorAritmetico.POTENCIA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    if (derecha.valor === 0 && izquierda.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR no se puede elevar 0 a la 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, Math.pow(izquierda.valor, derecha.valor), tipo_1.tipos.ENTERO);
                                case tipo_1.tipos.DOBLE:
                                    if (derecha.valor === 0 && izquierda.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR no se puede elevar 0 a la 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, Math.pow(izquierda.valor, derecha.valor), tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una potencia entre un int y un boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una potencia entre un int y un string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CARACTER:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una potencia entre un int y un cadacter", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    if (derecha.valor === 0 && izquierda.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR no se puede elevar 0 a la 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, Math.pow(izquierda.valor, derecha.valor), tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.DOBLE:
                                    if (derecha.valor === 0 && izquierda.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR no se puede elevar 0 a la 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, Math.pow(izquierda.valor, derecha.valor), tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una potencia entre un double y un boolean", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CADENA:
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una potencia entre un double y un string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CARACTER:
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una potencia entre un double y un cadacter", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipo_1.tipos.CARACTER:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una potencia con un string", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        case tipo_1.tipos.CADENA:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una potencia con un caracter", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        case tipo_1.tipos.BOOLEANO:
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar una potencia con un booleano", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        default:
                            break;
                    }
                }
                else {
                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
                break;
            case OperadorAritmetico.MODULO:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR no se puede hacer mod con 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.ENTERO);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor % derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.DOBLE:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR no se puede hacer mod con 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor % derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar modulo con un int y un string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CADENA:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar modulo con un int y un caracter", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar modulo con un int y un booleano", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR no se puede hacer mod con 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor % derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.DOBLE:
                                    if (derecha.valor === 0) {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "ERROR no se puede hacer mod con 0", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                    this.Tipo = new tipo_1.default(tipo_1.tipos.DOBLE);
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor % derecha.valor, tipo_1.tipos.DOBLE);
                                case tipo_1.tipos.CARACTER:
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar modulo con un double y un string", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.CADENA:
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar modulo con un double y un caracter", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                case tipo_1.tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar modulo con un double y un booleano", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                default:
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                        case tipo_1.tipos.CARACTER:
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar modulo con un string", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        case tipo_1.tipos.CADENA:
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar modulo con un caracter", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        case tipo_1.tipos.BOOLEANO:
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede realizar modulo con un booleano", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        default:
                            break;
                    }
                }
                else {
                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
                break;
        }
        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("ARITMETICA");
        if (!this.ExpresionDerecha && this.ExpresionIzquierda) {
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(undefined, undefined, this.ExpresionIzquierda.getNodo());
        }
        else if (this.ExpresionDerecha && this.ExpresionIzquierda) {
            nodo.agregarHijo(undefined, undefined, this.ExpresionIzquierda.getNodo());
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(undefined, undefined, this.ExpresionDerecha.getNodo());
        }
        return nodo;
    }
}
exports.default = Aritmetica;
var OperadorAritmetico;
(function (OperadorAritmetico) {
    OperadorAritmetico["SUMA"] = "+";
    OperadorAritmetico["RESTA"] = "-";
    OperadorAritmetico["MULTIPLICACION"] = "*";
    OperadorAritmetico["DIVISION"] = "/";
    OperadorAritmetico["POTENCIA"] = "^";
    OperadorAritmetico["MODULO"] = "%";
})(OperadorAritmetico = exports.OperadorAritmetico || (exports.OperadorAritmetico = {}));
//# sourceMappingURL=aritmetica.js.map