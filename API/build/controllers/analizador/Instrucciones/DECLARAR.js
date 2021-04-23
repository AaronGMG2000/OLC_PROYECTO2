"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const tipo_1 = require("../tablaSimbolo/tipo");
class DECLARAR extends instruccion_1.Instruccion {
    constructor(linea, columna, ID, Tipo, DIMENSION = -1, CANTIDAD = -1, exp) {
        super(linea, columna);
        this.exp = exp;
        this.ID = ID;
        this.tipo = Tipo;
        this.DIMENSION = DIMENSION;
        this.CANTIDAD = CANTIDAD;
    }
    ejecutar(arbol, tabla) {
        const comprobar = tabla.get(this.ID);
        if (comprobar.tipo.tipos !== tipo_1.tipos.ERROR) {
            tabla.set(this.ID, this.exp, this.tipo, this.DIMENSION, this.CANTIDAD);
            return;
        }
        //ERROR
    }
}
exports.default = DECLARAR;
//# sourceMappingURL=DECLARAR.js.map