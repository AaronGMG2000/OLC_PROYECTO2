"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
class ASIGNAR extends instruccion_1.Instruccion {
    constructor(linea, columna, ID, UBICACION = -1, exp) {
        super(linea, columna);
        this.exp = exp;
        this.ID = ID;
        this.UBICACION = UBICACION;
    }
    ejecutar(arbol, tabla) {
        var _a;
        const expre = tabla.get(this.ID);
        if (expre) {
            if (expre.tipo.tipos !== ((_a = this.exp) === null || _a === void 0 ? void 0 : _a.Tipo.tipos)) {
                arbol.errores.push(new Excepcion_1.default("Semantico", "el tipado de la variable no coincide con el del valor indicado", this.linea, this.columna));
                return;
            }
            const comprobar = tabla.update(this.ID, this.exp, this.UBICACION);
            if (!comprobar) {
                arbol.errores.push(new Excepcion_1.default("Semantico", "No se encontro la variable " + this.ID, this.linea, this.columna));
                return;
            }
        }
        return;
        //ERROR
    }
}
exports.default = ASIGNAR;
//# sourceMappingURL=ASIGNAR.js.map