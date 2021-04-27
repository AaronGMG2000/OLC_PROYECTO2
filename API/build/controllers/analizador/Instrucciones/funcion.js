"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const tipo_1 = require("../tablaSimbolo/tipo");
class FUNCION extends instruccion_1.Instruccion {
    constructor(linea, columna, tipo, nombre, INS, Parametro) {
        super(linea, columna);
        this.tipo = tipo;
        this.nombre = nombre;
        this.INSTRUCCION = INS;
        this.PARAMETRO = Parametro;
    }
    ejecutar(arbol, tabla) {
        this.nombre += "#";
        if (this.PARAMETRO) {
            for (let par of this.PARAMETRO) {
                this.nombre += "" + par.tipo.tipos;
            }
        }
        var comprobar = tabla.get(this.nombre);
        if (comprobar.tipo.tipos === tipo_1.tipos.ERROR) {
            tabla.set(this.nombre, this, this.tipo, -1, -1);
            return;
        }
        arbol.num_error++;
        new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Ya existe una función con el nombre indicado", this.linea, this.columna);
        return;
        // ERROR
    }
}
exports.default = FUNCION;
//# sourceMappingURL=funcion.js.map