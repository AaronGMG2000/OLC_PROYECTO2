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
class INCREMENTO extends expresion_1.Expresion {
    constructor(linea, columna, exp) {
        const tip = new tipo_1.default(tipo_1.tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.exp = exp;
    }
    getValor(arbol, tabla) {
        let nom = this.exp.nombre;
        let val = this.exp.getValor(arbol, tabla);
        if (val.nombre === "FUNCION") {
            this.exp.nombre = "";
        }
        if (val.Tipo.tipos === tipo_1.tipos.DOBLE || val.Tipo.tipos === tipo_1.tipos.ENTERO) {
            if (this.exp.nombre !== "" && this.exp.nombre !== undefined) {
                let expre = tabla.get(this.exp.nombre);
                if (expre.tipo.tipos !== tipo_1.tipos.ERROR && (expre.tipo.tipos === tipo_1.tipos.DOBLE || expre.tipo.tipos === tipo_1.tipos.ENTERO)) {
                    if (this.exp.posicion === -1) {
                        let v = expre.getValor(arbol, tabla);
                        var v2 = new literal_1.default(this.linea, this.columna, v.valor + 1, expre.valor.Tipo.tipos);
                        tabla.update(this.exp.nombre, v2);
                        return new literal_1.default(this.linea, this.columna, expre.valor.valor, expre.tipo.tipos);
                    }
                    else {
                        let value = expre.valor.valor[this.exp.posicion.valor];
                        let v = new literal_1.default(this.linea, this.columna, value, expre.tipo.tipos);
                        let dir = new literal_1.default(this.linea, this.columna, this.exp.posicion.valor, this.exp.Tipo.tipos);
                        tabla.update(this.exp.nombre, v, dir);
                        return new literal_1.default(this.linea, this.columna, value + 1, expre.tipo.tipos);
                    }
                }
            }
            else {
                let expre = undefined;
                if (val.nombre === "FUNCION") {
                    expre = val;
                    this.exp.nombre = nom;
                }
                else {
                    expre = this.exp.getValor(arbol, tabla);
                }
                return new literal_1.default(this.linea, this.columna, expre.valor + 1, expre.Tipo.tipos);
            }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Se esperaba un valor numerico", this.linea, this.columna));
        return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
    }
}
exports.default = INCREMENTO;
//# sourceMappingURL=incremento.js.map