"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const nodoAST_1 = require("../Abstract/nodoAST");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const tipo_1 = require("../tablaSimbolo/tipo");
class ASIGNAR extends instruccion_1.Instruccion {
    constructor(linea, columna, ID, UBICACION, exp, tipv = "") {
        super(linea, columna);
        this.exp = exp;
        this.ID = ID;
        if (UBICACION) {
            this.UBICACION = UBICACION;
        }
        else {
            this.UBICACION = -1;
        }
        this.tip = tipv;
    }
    ejecutar(arbol, tabla) {
        var _a;
        const expre = tabla.get(this.ID);
        let ubic = -1;
        if (this.UBICACION != -1) {
            ubic = this.UBICACION.getValor(arbol, tabla);
        }
        if (expre.tipo.tipos !== tipo_1.tipos.ERROR) {
            let value = (_a = this.exp) === null || _a === void 0 ? void 0 : _a.getValor(arbol, tabla);
            if (this.tip === "VECTOR" && expre.DIMENSION === -1) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Llamada de vector erronea", this.linea, this.columna));
                return false;
            }
            else if (this.tip === "LIST" && expre.CANTIDAD === -1) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Llamada de lista erronea", this.linea, this.columna));
                return false;
            }
            if (expre.tipo.tipos !== (value === null || value === void 0 ? void 0 : value.Tipo.tipos) && expre.tipo.tipos !== tipo_1.tipos.ENTERO
                && expre.tipo.tipos !== tipo_1.tipos.DOBLE && (value === null || value === void 0 ? void 0 : value.Tipo.tipos) !== tipo_1.tipos.ENTERO
                && (value === null || value === void 0 ? void 0 : value.Tipo.tipos) !== tipo_1.tipos.DOBLE) {
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "Semantico", "el tipado de la variable no coincide con el del valor indicado", this.linea, this.columna));
                return false;
            }
            this.ast = true;
            const comprobar = tabla.update(this.ID, value, ubic);
            if (!comprobar) {
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "Semantico", "No se encontro la variable " + this.ID, this.linea, this.columna));
                return false;
            }
            this.ubic = ubic;
            return true;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Variable no declarada", this.linea, this.columna));
        return false;
        //ERROR
    }
    getNodo() {
        var _a, _b, _c;
        let nodo = new nodoAST_1.nodoAST("ASIGNAR");
        if (this.UBICACION !== -1) {
            if (this.tip === "LIST") {
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("[");
                nodo.agregarHijo("[");
                nodo.agregarHijo(this.ubic.getNodo());
                nodo.agregarHijo("]");
                nodo.agregarHijo("]");
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined, undefined, (_a = this.exp) === null || _a === void 0 ? void 0 : _a.getNodo());
            }
            else {
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("[");
                nodo.agregarHijo(this.ubic.getNodo());
                nodo.agregarHijo("]");
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined, undefined, (_b = this.exp) === null || _b === void 0 ? void 0 : _b.getNodo());
            }
        }
        else {
            nodo.agregarHijo(this.ID);
            nodo.agregarHijo("=");
            nodo.agregarHijo(undefined, undefined, (_c = this.exp) === null || _c === void 0 ? void 0 : _c.getNodo());
        }
        return nodo;
    }
}
exports.default = ASIGNAR;
//# sourceMappingURL=ASIGNAR.js.map