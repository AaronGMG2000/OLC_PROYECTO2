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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperadorAritmetico = void 0;
const Instruccion_1 = require("../Abstract/Instruccion");
const Excepcion_1 = __importDefault(require("../Excepciones/Excepcion"));
const Tipo_1 = __importStar(require("../tablaSimbolos/Tipo"));
class Aritmetica extends Instruccion_1.Instruccion {
    constructor(operador, fila, columna, operando1, operando2) {
        super(new Tipo_1.default(Tipo_1.tipos.ENTERO), fila, columna);
        this.operador = operador;
        if (!operando2) {
            this.opU = operando1;
        }
        else {
            this.op1 = operando1;
            this.op2 = operando2;
        }
    }
    interpretar(tree, table) {
        var _a, _b, _c, _d, _e, _f;
        var izquierdo = null, derecho = null, unario = null;
        if (this.opU == (null || undefined)) {
            izquierdo = (_a = this.op1) === null || _a === void 0 ? void 0 : _a.interpretar(tree, table);
            if (izquierdo instanceof Excepcion_1.default)
                return izquierdo;
            derecho = (_b = this.op2) === null || _b === void 0 ? void 0 : _b.interpretar(tree, table);
            if (derecho instanceof Excepcion_1.default)
                return derecho;
        }
        else {
            unario = this.opU.interpretar(tree, table);
            if (unario instanceof Excepcion_1.default)
                return unario;
        }
        if (this.operador == OperadorAritmetico.SUMA) {
            if (((_c = this.op1) === null || _c === void 0 ? void 0 : _c.tipo.getTipos()) == Tipo_1.tipos.ENTERO) {
                if (((_d = this.op2) === null || _d === void 0 ? void 0 : _d.tipo.getTipos()) == Tipo_1.tipos.ENTERO) {
                    this.tipo = new Tipo_1.default(Tipo_1.tipos.ENTERO);
                    return parseInt(izquierdo) + parseInt(derecho);
                }
                else if (((_e = this.op2) === null || _e === void 0 ? void 0 : _e.tipo.getTipos()) == Tipo_1.tipos.DECIMAL) {
                    this.tipo = new Tipo_1.default(Tipo_1.tipos.DECIMAL);
                    return parseInt(izquierdo) + parseFloat(derecho);
                }
                else if (((_f = this.op2) === null || _f === void 0 ? void 0 : _f.tipo.getTipos()) == Tipo_1.tipos.CADENA) {
                    this.tipo = new Tipo_1.default(Tipo_1.tipos.CADENA);
                    return izquierdo + "" + derecho;
                }
                // BOOLEAN
                // CHAR
            }
            else {
                return new Excepcion_1.default("Semántico", "Operandos erroneos para +", this.linea, this.columna);
            }
        }
        else {
            return new Excepcion_1.default("Semántico", "Tipo de Operación Erróneo.", this.linea, this.columna);
        }
    }
}
exports.default = Aritmetica;
var OperadorAritmetico;
(function (OperadorAritmetico) {
    OperadorAritmetico[OperadorAritmetico["SUMA"] = 0] = "SUMA";
    OperadorAritmetico[OperadorAritmetico["RESTA"] = 1] = "RESTA";
    OperadorAritmetico[OperadorAritmetico["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    OperadorAritmetico[OperadorAritmetico["DIVISION"] = 3] = "DIVISION";
    OperadorAritmetico[OperadorAritmetico["MENOSUNARIO"] = 4] = "MENOSUNARIO";
    OperadorAritmetico[OperadorAritmetico["POTENCIA"] = 5] = "POTENCIA";
    OperadorAritmetico[OperadorAritmetico["MODULO"] = 6] = "MODULO";
})(OperadorAritmetico = exports.OperadorAritmetico || (exports.OperadorAritmetico = {}));
//# sourceMappingURL=Aritmetica.js.map