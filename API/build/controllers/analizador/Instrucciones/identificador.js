"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../expresiones/expresion");
class identificador extends expresion_1.Expresion {
    constructor(linea, columna, valor, Tipo, ID) {
        super(linea, columna, valor, Tipo);
        this.ID = ID;
    }
    getValor(arbol, tabla) {
        var simb = tabla.get(this.ID);
        this.valor = simb.valor;
        this.Tipo = simb.tipo;
        return this;
    }
}
exports.default = identificador;
//# sourceMappingURL=identificador.js.map