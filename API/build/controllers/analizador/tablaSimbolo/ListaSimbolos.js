"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListaSimbolo {
    constructor(numero, ID, grupo, tipo, fila, columna, ambito) {
        this.ID = ID.toUpperCase();
        this.grupo = grupo.toUpperCase();
        this.tipo = tipo.toUpperCase();
        this.fila = fila;
        this.columna = columna;
        this.ambito = ambito.toUpperCase();
        this.numero = numero;
    }
}
exports.default = ListaSimbolo;
//# sourceMappingURL=ListaSimbolos.js.map