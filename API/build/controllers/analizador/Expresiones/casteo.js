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
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede hacer casteo de un string", this.linea, this.columna));
                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
            case tipo_1.tipos.BOOLEANO:
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede hacer casteo de double", this.linea, this.columna));
                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
            case tipo_1.tipos.DOBLE:
                switch (valor === null || valor === void 0 ? void 0 : valor.Tipo.tipos) {
                    case tipo_1.tipos.BOOLEANO:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede hacer casteo de double a boolean", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    case tipo_1.tipos.CARACTER:
                        return new literal_1.default(this.linea, this.columna, valor.valor.charCodeAt(), tipo_1.tipos.DOBLE);
                    case tipo_1.tipos.CADENA:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede hacer casteo de double a string", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    case tipo_1.tipos.ENTERO:
                        return new literal_1.default(this.linea, this.columna, Number(valor.valor), tipo_1.tipos.DOBLE);
                    case tipo_1.tipos.DOBLE:
                        return new literal_1.default(this.linea, this.columna, valor.valor, tipo_1.tipos.DOBLE);
                }
            case tipo_1.tipos.ENTERO:
                switch (valor === null || valor === void 0 ? void 0 : valor.Tipo.tipos) {
                    case tipo_1.tipos.BOOLEANO:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede hacer casteo de int a boolean", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    case tipo_1.tipos.CARACTER:
                        return new literal_1.default(this.linea, this.columna, valor.valor.charCodeAt(), tipo_1.tipos.ENTERO);
                    case tipo_1.tipos.CADENA:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede hacer casteo de int a string", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    case tipo_1.tipos.ENTERO:
                        return new literal_1.default(this.linea, this.columna, Number(valor.valor), tipo_1.tipos.ENTERO);
                    case tipo_1.tipos.DOBLE:
                        return new literal_1.default(this.linea, this.columna, Math.trunc(valor.valor), tipo_1.tipos.ENTERO);
                }
            case tipo_1.tipos.CARACTER:
                switch (valor === null || valor === void 0 ? void 0 : valor.Tipo.tipos) {
                    case tipo_1.tipos.BOOLEANO:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede hacer casteo de caracter a boolean", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    case tipo_1.tipos.CARACTER:
                        return new literal_1.default(this.linea, this.columna, valor.valor, tipo_1.tipos.ENTERO);
                    case tipo_1.tipos.CADENA:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede hacer casteo de caracter a cadena", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    case tipo_1.tipos.ENTERO:
                        console.log(String.fromCharCode(valor.valor));
                        return new literal_1.default(this.linea, this.columna, String.fromCharCode(valor.valor), tipo_1.tipos.CARACTER);
                    case tipo_1.tipos.DOBLE:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede hacer casteo de caracter a double", this.linea, this.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "La variable indicada no esta declarada", this.linea, this.columna));
        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
    }
    getNodo() {
        var _a;
        let nodo = new nodoAST_1.nodoAST("CASTEO");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.Tipo.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo(undefined, undefined, (_a = this.exp) === null || _a === void 0 ? void 0 : _a.getNodo());
        return nodo;
    }
}
exports.default = CASTEO;
//# sourceMappingURL=casteo.js.map