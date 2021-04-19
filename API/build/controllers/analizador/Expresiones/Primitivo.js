"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
class Primitivo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, linea, columna) {
        super(tipo, linea, columna);
        this.valor = valor;
    }
    interpretar(tree, table) {
        return this.valor;
    }
}
exports.default = Primitivo;
//# sourceMappingURL=Primitivo.js.map