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
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
const expresion_1 = require("./expresion");
const literal_1 = __importDefault(require("./literal"));
class Aritmetica extends expresion_1.Expresion {
    constructor(operador, linea, columna, valor, Tipo, iz, der) {
        super(linea, columna, valor, Tipo);
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
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.BOOLEANO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.CADENA:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.BOOLEANO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.CADENA:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.BOOLEANO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.CADENA:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.CADENA:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                case tipo_1.tipos.BOOLEANO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                case tipo_1.tipos.CADENA:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.CADENA:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor + derecha.valor, new tipo_1.default(tipo_1.tipos.CADENA));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            //Error
                            break;
                    }
                }
                else {
                    //ERROR
                }
                break;
            case OperadorAritmetico.RESTA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.BOOLEANO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.BOOLEANO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.BOOLEANO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor - derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }
                else if (!derecha && izquierda) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            return new literal_1.default(this.linea, this.columna, -izquierda.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                        case tipo_1.tipos.DOBLE:
                            return new literal_1.default(this.linea, this.columna, -izquierda.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                        default:
                            break;
                    }
                }
                else {
                    //ERROR
                }
                break;
            case OperadorAritmetico.MULTIPLICACION:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor * derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            //Error
                            break;
                    }
                }
                else {
                    //ERROR
                }
                break;
            case OperadorAritmetico.DIVISION:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.CARACTER:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor / derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }
                else {
                    //ERROR
                }
                break;
            case OperadorAritmetico.POTENCIA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor ^ derecha.valor, new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor ^ derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor ^ derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor ^ derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }
                else {
                    //ERROR
                }
                break;
            case OperadorAritmetico.MODULO:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor % derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor % derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor % derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                case tipo_1.tipos.DOBLE:
                                    return new literal_1.default(this.linea, this.columna, izquierda.valor % derecha.valor, new tipo_1.default(tipo_1.tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }
                else {
                    //ERROR
                }
                break;
            default:
                break;
        }
        return this;
    }
}
exports.default = Aritmetica;
var OperadorAritmetico;
(function (OperadorAritmetico) {
    OperadorAritmetico[OperadorAritmetico["SUMA"] = 0] = "SUMA";
    OperadorAritmetico[OperadorAritmetico["RESTA"] = 1] = "RESTA";
    OperadorAritmetico[OperadorAritmetico["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    OperadorAritmetico[OperadorAritmetico["DIVISION"] = 3] = "DIVISION";
    OperadorAritmetico[OperadorAritmetico["POTENCIA"] = 4] = "POTENCIA";
    OperadorAritmetico[OperadorAritmetico["MODULO"] = 5] = "MODULO";
})(OperadorAritmetico = exports.OperadorAritmetico || (exports.OperadorAritmetico = {}));
//# sourceMappingURL=aritmetica.js.map