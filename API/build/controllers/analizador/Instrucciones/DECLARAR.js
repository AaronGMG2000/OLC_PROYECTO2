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
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = require("../Abstract/nodoAST");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const literal_1 = __importDefault(require("../expresiones/literal"));
const ListaSimbolos_1 = __importDefault(require("../tablaSimbolo/ListaSimbolos"));
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
class DECLARAR extends instruccion_1.Instruccion {
    constructor(linea, columna, ID, Tipo, DIMENSION, CANTIDAD, exp, tipo2) {
        super(linea, columna);
        this.lista = [];
        this.v1 = 0;
        this.v2 = 0;
        if (!exp && typeof (DIMENSION) !== typeof (-1) && typeof (DIMENSION) !== typeof (undefined)) {
            this.exp = new literal_1.default(this.linea, this.columna, "vector", Tipo.tipos, true);
        }
        else if (!exp && typeof (CANTIDAD) !== typeof (-1) && typeof (CANTIDAD) !== typeof (undefined)) {
            this.exp = new literal_1.default(this.linea, this.columna, undefined, Tipo.tipos, true);
        }
        else {
            this.exp = exp;
        }
        this.ID = ID;
        this.tipo = Tipo;
        this.tipo2 = tipo2;
        if (DIMENSION) {
            this.DIMENSION = DIMENSION;
        }
        else {
            this.DIMENSION = -1;
        }
        if (CANTIDAD) {
            this.CANTIDAD = CANTIDAD;
        }
        else {
            this.CANTIDAD = -1;
        }
    }
    ejecutar(arbol, tabla) {
        var _a;
        if (this.tipo2 instanceof tipo_1.default) {
            if (this.tipo2.tipos !== this.tipo.tipos) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "Semantico", "El tipo de declaración no coincide con el de la variable", this.linea, this.columna));
                return false;
            }
        }
        let nueva_variable = undefined;
        const comprobar = tabla.getLocal(this.ID);
        if (this.exp instanceof Array && this.DIMENSION) {
            let nueva = [];
            for (let valores of this.exp) {
                let value = valores.getValor(arbol, tabla);
                if (value) {
                    if (value.Tipo.tipos !== this.tipo.tipos) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "tipo dentro de valores de la declaración no coincide", value.linea, value.columna));
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                    }
                    nueva.push(value.valor);
                    this.lista.push(new literal_1.default(this.linea, this.columna, value.valor, this.tipo.tipos));
                }
                else {
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "fallo al obtener el valor", valores.linea, valores.columna));
                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
            }
            this.lista = nueva;
            nueva_variable = new literal_1.default(this.linea, this.columna, nueva, this.tipo.tipos, true);
        }
        if (comprobar.tipo.tipos === tipo_1.tipos.ERROR) {
            let ex = undefined;
            if (nueva_variable) {
                ex = nueva_variable;
            }
            else {
                ex = (_a = this.exp) === null || _a === void 0 ? void 0 : _a.getValor(arbol, tabla);
            }
            let v1 = -1;
            let v2 = -1;
            if (typeof (this.DIMENSION) !== typeof (-1)) {
                v1 = this.DIMENSION.getValor(arbol, tabla).valor;
                this.v1 = v1;
            }
            if (typeof (this.CANTIDAD) !== typeof (-1)) {
                v2 = this.CANTIDAD.getValor(arbol, tabla).valor;
            }
            if (ex) {
                if (ex.Tipo.tipos === tipo_1.tipos.ERROR) {
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Fallo al asignar", this.linea, this.columna));
                    return false;
                }
                if (ex.Tipo.tipos !== this.tipo.tipos && this.tipo.tipos !== tipo_1.tipos.DOBLE
                    && this.tipo.tipos !== tipo_1.tipos.ENTERO) {
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "Semantico", "los tipos ingresados no coinciden", this.linea, this.columna));
                    return false;
                }
                if ((this.tipo.tipos === tipo_1.tipos.DOBLE || this.tipo.tipos === tipo_1.tipos.ENTERO)
                    && (ex.Tipo.tipos !== tipo_1.tipos.DOBLE && ex.Tipo.tipos !== tipo_1.tipos.ENTERO)) {
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "Semantico", "los tipos ingresados no coinciden", this.linea, this.columna));
                    return false;
                }
            }
            if (!ex) {
                ex = new literal_1.default(this.linea, this.columna, undefined, this.tipo.tipos, true);
            }
            if (this.DIMENSION != -1 && v1 < 0) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "Semantico", "Tamaño de vector invalido", this.linea, this.columna));
                return false;
            }
            if (tabla.nombre.toUpperCase() === "GLOBAL") {
                if (v1 !== -1) {
                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, this.ID, "VECTOR", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));
                }
                else if (v2 !== -1) {
                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, this.ID, "LISTA", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));
                }
                else {
                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, this.ID, "VARIABLE", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));
                }
            }
            this.ast = true;
            tabla.set(this.ID, ex, this.tipo, v1, v2);
            return true;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "Semantico", "La Variable ya esta declarada", this.linea, this.columna));
        return false;
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("DECLARAR");
        if (typeof (this.DIMENSION) !== typeof (-1) && this.exp instanceof Array) {
            nodo.agregarHijo(undefined, undefined, this.tipo.getNodo());
            nodo.agregarHijo("[");
            nodo.agregarHijo("]");
            nodo.agregarHijo(this.ID);
            nodo.agregarHijo("=");
            nodo.agregarHijo("{");
            let nodo2 = new nodoAST_1.nodoAST("EXPRESIONES");
            for (let element of this.exp) {
                nodo2.agregarHijo(undefined, undefined, element.getNodo());
            }
            nodo.agregarHijo(undefined, undefined, nodo2);
            nodo.agregarHijo("}");
            nodo.agregarHijo(";");
        }
        else if (typeof (this.DIMENSION) !== typeof (-1)) {
            nodo.agregarHijo(undefined, undefined, this.tipo.getNodo());
            nodo.agregarHijo("[");
            nodo.agregarHijo("]");
            nodo.agregarHijo(this.ID);
            nodo.agregarHijo("=");
            nodo.agregarHijo("new");
            nodo.agregarHijo(undefined, undefined, this.tipo2.getNodo());
            nodo.agregarHijo("[");
            let g = new literal_1.default(this.linea, this.columna, this.v1, this.tipo.tipos);
            nodo.agregarHijo(undefined, undefined, g.getNodo());
            nodo.agregarHijo("]");
            nodo.agregarHijo(";");
        }
        else if (typeof (this.CANTIDAD) !== typeof (-1)) {
            if (!this.exp) {
                nodo.agregarHijo("LIST");
                nodo.agregarHijo("<");
                nodo.agregarHijo(undefined, undefined, this.tipo.getNodo());
                nodo.agregarHijo(">");
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("=");
                nodo.agregarHijo("new");
                nodo.agregarHijo("LIST");
                nodo.agregarHijo("<");
                nodo.agregarHijo(undefined, undefined, this.tipo2.getNodo());
                nodo.agregarHijo(">");
                nodo.agregarHijo(";");
            }
            else {
                nodo.agregarHijo("LIST");
                nodo.agregarHijo("<");
                nodo.agregarHijo(undefined, undefined, this.tipo.getNodo());
                nodo.agregarHijo(">");
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
                nodo.agregarHijo(";");
            }
        }
        else {
            if (this.exp) {
                nodo.agregarHijo(this.tipo.getTipo());
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
                nodo.agregarHijo(";");
            }
            else {
                nodo.agregarHijo(this.tipo.getTipo());
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo(";");
            }
        }
        return nodo;
    }
}
exports.default = DECLARAR;
//# sourceMappingURL=DECLARAR.js.map