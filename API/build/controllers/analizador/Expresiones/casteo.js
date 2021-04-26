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
class CASTEO extends expresion_1.Expresion {
    constructor(linea, columna, valor, tipo, exp) {
        super(linea, columna, valor, new tipo_1.default(tipo_1.tipos.BOOLEANO));
        this.exp = exp;
        this.tipo = tipo;
    }
    getValor(arbol, tabla) {
        var _a;
        let valor = (_a = this.exp) === null || _a === void 0 ? void 0 : _a.getValor(arbol, tabla);
        switch (this.tipo.tipos) {
            case tipo_1.tipos.CADENA:
                return new literal_1.default(this.linea, this.columna, valor === null || valor === void 0 ? void 0 : valor.valor.toString(), tipo_1.tipos.CADENA);
            case tipo_1.tipos.BOOLEANO:
                return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
            case tipo_1.tipos.DOBLE:
                switch (valor === null || valor === void 0 ? void 0 : valor.Tipo.tipos) {
                    case tipo_1.tipos.BOOLEANO:
                        return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
                    case tipo_1.tipos.CARACTER:
                        return new literal_1.default(this.linea, this.columna, valor.valor.charCodeAt(), tipo_1.tipos.DOBLE);
                    case tipo_1.tipos.CADENA:
                        return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
                    case tipo_1.tipos.ENTERO:
                        return new literal_1.default(this.linea, this.columna, Number(valor.valor), tipo_1.tipos.DOBLE);
                    case tipo_1.tipos.DOBLE:
                        return new literal_1.default(this.linea, this.columna, valor.valor, tipo_1.tipos.DOBLE);
                }
            case tipo_1.tipos.ENTERO:
                switch (valor === null || valor === void 0 ? void 0 : valor.Tipo.tipos) {
                    case tipo_1.tipos.BOOLEANO:
                        return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
                    case tipo_1.tipos.CARACTER:
                        return new literal_1.default(this.linea, this.columna, valor.valor.charCodeAt(), tipo_1.tipos.ENTERO);
                    case tipo_1.tipos.CADENA:
                        return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
                    case tipo_1.tipos.ENTERO:
                        return new literal_1.default(this.linea, this.columna, Number(valor.valor), tipo_1.tipos.ENTERO);
                    case tipo_1.tipos.DOBLE:
                        return new literal_1.default(this.linea, this.columna, Math.trunc(valor.valor), tipo_1.tipos.ENTERO);
                }
            case tipo_1.tipos.CARACTER:
                switch (valor === null || valor === void 0 ? void 0 : valor.Tipo.tipos) {
                    case tipo_1.tipos.BOOLEANO:
                        return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
                    case tipo_1.tipos.CARACTER:
                        return new literal_1.default(this.linea, this.columna, valor.valor, tipo_1.tipos.ENTERO);
                    case tipo_1.tipos.CADENA:
                        return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
                    case tipo_1.tipos.ENTERO:
                        console.log(String.fromCharCode(valor.valor));
                        return new literal_1.default(this.linea, this.columna, String.fromCharCode(valor.valor), tipo_1.tipos.CARACTER);
                    case tipo_1.tipos.DOBLE:
                        return new literal_1.default(this.linea, this.columna, "error", tipo_1.tipos.ERROR);
                }
        }
        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
    }
}
exports.default = CASTEO;
//# sourceMappingURL=casteo.js.map