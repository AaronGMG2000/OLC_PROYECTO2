"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
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
            if (expre.tipo.tipos !== (value === null || value === void 0 ? void 0 : value.Tipo.tipos)) {
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "Semantico", "el tipado de la variable no coincide con el del valor indicado", this.linea, this.columna));
                return false;
            }
            const comprobar = tabla.update(this.ID, value, ubic);
            if (!comprobar) {
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "Semantico", "No se encontro la variable " + this.ID, this.linea, this.columna));
                return false;
            }
            return true;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Variable no declarada", this.linea, this.columna));
        return false;
        //ERROR
    }
}
exports.default = ASIGNAR;
//# sourceMappingURL=ASIGNAR.js.map