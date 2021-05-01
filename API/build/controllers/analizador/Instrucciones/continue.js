"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
class CONTINUE extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(arbol, tabla) {
        if (arbol.pilaCiclo.length == 0) {
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "No se puede utiilzar continue fuera de un ciclo", this.linea, this.columna));
            return;
        }
        return { nombre: "CONTINUE", retorno: undefined };
        //ERROR
    }
}
exports.default = CONTINUE;
//# sourceMappingURL=continue.js.map