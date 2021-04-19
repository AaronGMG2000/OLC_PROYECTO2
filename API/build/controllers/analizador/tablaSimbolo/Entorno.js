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
const Simbolo_1 = __importDefault(require("./Simbolo"));
const Tipo_1 = __importStar(require("./Tipo"));
class Entorno {
    constructor(anterior) {
        this.anterior = anterior;
        this.tabla = new Map();
    }
    set(simbolo, valor, tipo) {
        if (!this.tabla.has(simbolo)) {
            this.tabla.set(simbolo, new Simbolo_1.default(tipo, simbolo, valor));
        }
        else {
            //Error
            console.log("error");
        }
    }
    update(simbolo, valor) {
        for (var temp = this; temp != null; temp = temp.anterior) {
            if (temp.tabla.has(simbolo)) {
                var anterior = temp.tabla.get(simbolo);
                anterior.valor = valor;
                temp.tabla.set(simbolo, anterior);
                return;
            }
        }
        //Error
        console.log("error");
    }
    get(variable) {
        for (var temp = this; temp != null; temp = temp.anterior) {
            if (temp.tabla.has(variable)) {
                return temp.tabla.get(variable);
            }
        }
        //Error
        return new Simbolo_1.default(new Tipo_1.default(Tipo_1.tipos.ERROR), 'ERROR', undefined);
    }
}
exports.default = Entorno;
//# sourceMappingURL=Entorno.js.map