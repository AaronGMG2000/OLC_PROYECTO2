"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
const expresion_1 = require("./expresion");
class Literal extends expresion_1.Expresion {
    constructor(linea, columna, valor, T, vector, L = "") {
        const tip = new tipo_1.default(T);
        if (!vector) {
            switch (tip.tipos) {
                case tipo_1.tipos.ENTERO:
                    valor = Number(valor);
                    break;
                case tipo_1.tipos.BOOLEANO:
                    if (typeof (valor) == typeof ("") && valor.toUpperCase() === "FALSE") {
                        valor = false;
                    }
                    else if (typeof (valor) == typeof ("")) {
                        valor = true;
                    }
                    break;
                case tipo_1.tipos.DOBLE:
                    valor = Number(parseFloat(valor));
                    break;
                default:
                    valor = valor;
            }
        }
        super(linea, columna, valor, tip);
        this.LOV = L;
    }
    getValor(arbol, tabla) {
        return this;
    }
}
exports.default = Literal;
//# sourceMappingURL=literal.js.map