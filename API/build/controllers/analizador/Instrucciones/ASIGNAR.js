"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
class DECLARAR extends instruccion_1.Instruccion {
    constructor(linea, columna, ID, UBICACION = -1, exp) {
        super(linea, columna);
        this.exp = exp;
        this.ID = ID;
        this.UBICACION = UBICACION;
    }
    ejecutar(arbol, tabla) {
        const comprobar = tabla.update(this.ID, this.exp, this.UBICACION);
        if (!comprobar) {
            arbol.errores.push(new Excepcion_1.default("Semantico", "No se encontro la variable " + this.ID, this.linea, this.columna));
        }
        //ERROR
    }
}
exports.default = DECLARAR;
//# sourceMappingURL=ASIGNAR.js.map