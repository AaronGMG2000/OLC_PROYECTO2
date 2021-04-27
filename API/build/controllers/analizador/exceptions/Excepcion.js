"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Excepcion {
    constructor(num, tipo, descripcion, fila, columna) {
        this.numero = num;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }
    toString() {
        return this.tipo + " - " + this.descripcion + " [" + this.fila + ", " + this.columna + "]";
    }
    imprimir() {
        return this.toString() + "\n";
    }
}
exports.default = Excepcion;
//# sourceMappingURL=Excepcion.js.map