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
class VECTOR extends expresion_1.Expresion {
    constructor(linea, columna, nombre, posicion, tipv) {
        const tip = new tipo_1.default(tipo_1.tipos.ENTERO);
        super(linea, columna, 0, tip, nombre, posicion);
        this.tip = tipv;
    }
    getValor(arbol, tabla) {
        let expre = tabla.get(this.nombre);
        if (expre.tipo.tipos !== tipo_1.tipos.ERROR) {
            if (this.tip === "VECTOR" && expre.DIMENSION === -1) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Llamada de vector erronea", this.linea, this.columna));
                return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
            }
            else if (this.tip === "LIST" && expre.CANTIDAD === -1) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Llamada de lista erronea", this.linea, this.columna));
                return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
            }
            const pos = this.posicion.getValor(arbol, tabla);
            if ((pos.valor < expre.DIMENSION && pos.valor >= 0) || (pos.valor < expre.CANTIDAD && pos.valor >= 0)) {
                let value = expre.valor.valor[pos.valor];
                return new literal_1.default(this.linea, this.columna, value, expre.tipo.tipos);
            }
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Posición fuera del rango", this.linea, this.columna));
            return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
        }
        if (this.tip === "VECTOR") {
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "El vector indicado no existe", this.linea, this.columna));
            return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
        }
        else {
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "La lista indicada no existe", this.linea, this.columna));
            return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("");
        if (this.tip === "LIST") {
            nodo = new nodoAST_1.nodoAST("LISTA");
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("[");
            nodo.agregarHijo("[");
            nodo.agregarHijo(undefined, undefined, this.posicion.getNodo());
            nodo.agregarHijo("]");
            nodo.agregarHijo("]");
        }
        else {
            nodo = new nodoAST_1.nodoAST("VECTOR");
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("[");
            nodo.agregarHijo(undefined, undefined, this.posicion.getNodo());
            nodo.agregarHijo("]");
        }
        return nodo;
    }
}
exports.default = VECTOR;
//# sourceMappingURL=vector.js.map