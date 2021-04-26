"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const literal_1 = __importDefault(require("../expresiones/literal"));
const tipo_1 = require("../tablaSimbolo/tipo");
class DECLARAR extends instruccion_1.Instruccion {
    constructor(linea, columna, ID, Tipo, DIMENSION, CANTIDAD, exp) {
        super(linea, columna);
        if (!exp && this.DIMENSION != -1) {
            this.exp = new literal_1.default(this.linea, this.columna, "vector", Tipo.tipos);
        }
        else if (!exp && this.CANTIDAD != -1) {
            this.exp = new literal_1.default(this.linea, this.columna, "lista", Tipo.tipos);
        }
        else {
            this.exp = exp;
        }
        this.ID = ID;
        this.tipo = Tipo;
        this.DIMENSION = DIMENSION;
        this.CANTIDAD = CANTIDAD;
    }
    ejecutar(arbol, tabla) {
        var _a;
        const comprobar = tabla.get(this.ID);
        if (comprobar.tipo.tipos === tipo_1.tipos.ERROR) {
            const ex = (_a = this.exp) === null || _a === void 0 ? void 0 : _a.getValor(arbol, tabla);
            let v1 = -1;
            let v2 = -1;
            if (typeof (this.DIMENSION) !== typeof (-1)) {
                v1 = this.DIMENSION.getValor(arbol, tabla).valor;
            }
            if (typeof (this.CANTIDAD) !== typeof (-1)) {
                v2 = this.DIMENSION.getValor(arbol, tabla).valor;
            }
            if (ex) {
                if (ex.Tipo.tipos != this.tipo.tipos &&
                    ((ex.Tipo.tipos !== tipo_1.tipos.DOBLE && this.tipo.tipos !== tipo_1.tipos.ENTERO) &&
                        (ex.Tipo.tipos !== tipo_1.tipos.ENTERO && this.tipo.tipos !== tipo_1.tipos.DOBLE))) {
                    arbol.errores.push(new Excepcion_1.default("Semantico", "los tipos ingresados no coinciden", this.linea, this.columna));
                    return;
                }
            }
            tabla.set(this.ID, ex, this.tipo, v1, v2);
            return;
        }
        //ERROR
    }
}
exports.default = DECLARAR;
//# sourceMappingURL=DECLARAR.js.map