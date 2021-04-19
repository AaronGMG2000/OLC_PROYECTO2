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
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
const expresion_1 = require("./expresion");
const literal_1 = __importDefault(require("./literal"));
class Aritmetica extends expresion_1.Expresion {
    constructor(linea, columna, valor, Tipo, iz, TipoOperacion, der) {
        super(linea, columna, valor, Tipo);
        this.ExpresionDerecha = der;
        this.ExpresionIzquierda = iz;
        this.TipoOperacion = TipoOperacion;
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
        switch (this.TipoOperacion) {
            case "+":
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipo_1.tipos.ENTERO:
                                    return new literal_1.default(this.linea, this.columna, Number(izquierda.valor) + Number(derecha.valor), new tipo_1.default(tipo_1.tipos.ENTERO));
                                case tipo_1.tipos.DECIMAL:
                                    return new literal_1.default(this.linea, this.columna, (Number(izquierda.valor) + Number(derecha.valor)).toFixed(15), new tipo_1.default(tipo_1.tipos.DECIMAL));
                                case tipo_1.tipos.BOOLEANO:
                                    return;
                                case tipo_1.tipos.CADENA:
                                        | ;
                                    return;
                                case tipo_1.tipos.CARACTER:
                                    return;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;
            case "-":
                break;
            case "*":
                break;
            case "/":
                break;
            case "%":
                break;
            case "neg":
                break;
            default:
                break;
        }
        return this;
    }
}
exports.default = Aritmetica;
//# sourceMappingURL=aritmetica.js.map