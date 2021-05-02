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
const expresion_1 = require("../expresiones/expresion");
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
const literal_1 = __importDefault(require("./literal"));
class TERNARIO extends expresion_1.Expresion {
    constructor(linea, columna, condicion, exp1, exp2) {
        super(linea, columna, undefined, new tipo_1.default(tipo_1.tipos.ENTERO));
        this.condicion = condicion;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    getValor(arbol, tabla) {
        let condicion = this.condicion.getValor(arbol, tabla);
        if (condicion.Tipo.tipos !== tipo_1.tipos.ERROR) {
            if (condicion.Tipo.tipos === tipo_1.tipos.BOOLEANO) {
                if (condicion.valor) {
                    let res = this.exp1.getValor(arbol, tabla);
                    if (res.Tipo.tipos !== tipo_1.tipos.ERROR) {
                        this.Tipo = res.Tipo;
                        return res;
                    }
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "el valor indicado no existe", this.linea, this.columna));
                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
                else {
                    let res = this.exp2.getValor(arbol, tabla);
                    if (res.Tipo.tipos !== tipo_1.tipos.ERROR) {
                        this.Tipo = res.Tipo;
                        return res;
                    }
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "el valor indicado no existe", this.linea, this.columna));
                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
            }
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "se esperaba un valor Bolean", this.linea, this.columna));
            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "la variable indicada en la condición no existe", this.linea, this.columna));
        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("TERNARIO");
        nodo.agregarHijo(undefined, undefined, this.condicion.getNodo());
        nodo.agregarHijo("?");
        nodo.agregarHijo(undefined, undefined, this.exp1.getNodo());
        nodo.agregarHijo(":");
        nodo.agregarHijo(undefined, undefined, this.exp2.getNodo());
        return nodo;
    }
}
exports.default = TERNARIO;
//# sourceMappingURL=ternario.js.map