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
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
const expresion_1 = require("./expresion");
const literal_1 = __importDefault(require("./literal"));
const variable_1 = __importDefault(require("./variable"));
class DECREMENTO extends expresion_1.Expresion {
    constructor(linea, columna, exp) {
        const tip = new tipo_1.default(tipo_1.tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.exp = exp;
    }
    getValor(arbol, tabla) {
        let comprobar = this.exp.getValor(arbol, tabla);
        if (comprobar.Tipo.tipos !== tipo_1.tipos.ERROR) {
            if (comprobar.Tipo.tipos === tipo_1.tipos.CADENA) {
                return new literal_1.default(this.linea, this.columna, comprobar.valor.toUpperCase(), tipo_1.tipos.CADENA);
            }
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "toUpper solo se puede realizar en un string", this.linea, this.columna));
            return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
        }
        if (this.exp instanceof variable_1.default) {
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "La variable indicada no existe", this.linea, this.columna));
            return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
        }
        return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
    }
}
exports.default = DECREMENTO;
//# sourceMappingURL=toUpper.js.map