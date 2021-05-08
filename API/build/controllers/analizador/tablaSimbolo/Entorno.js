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
const simbolo_1 = __importDefault(require("./simbolo"));
const tipo_1 = __importStar(require("./tipo"));
class Entorno {
    constructor(nombre = "GLOBAL", anterior) {
        this.nombre = nombre;
        this.anterior = anterior;
        this.tabla = new Map();
    }
    set(simbolo, valor, tipo, DIMENSION = -1, CANTIDAD = -1) {
        simbolo = simbolo.toUpperCase();
        if (!this.tabla.has(simbolo)) {
            this.tabla.set(simbolo, new simbolo_1.default(tipo, simbolo, valor, DIMENSION, CANTIDAD));
        }
    }
    update(simbolo, valor, POSICION = -1) {
        simbolo = simbolo.toUpperCase();
        for (var temp = this; temp != null; temp = temp.anterior) {
            if (temp.tabla.has(simbolo)) {
                var ant = temp.tabla.get(simbolo);
                if (ant) {
                    if (ant.DIMENSION == -1 && ant.CANTIDAD == -1) {
                        ant.valor = valor;
                        temp.tabla.set(simbolo, ant);
                        return true;
                    }
                    else if (POSICION != -1) {
                        if ((POSICION.valor < ant.DIMENSION || POSICION.valor < ant.CANTIDAD) && POSICION.valor >= 0) {
                            if (POSICION.Tipo.tipos === tipo_1.tipos.ENTERO) {
                                ant.valor.valor[POSICION.valor] = valor.valor;
                                temp.tabla.set(simbolo, ant);
                                return true;
                            }
                        }
                        //ERROR
                        return false;
                    }
                    else {
                        //ERROR
                        return false;
                    }
                }
            }
        }
        //Error
        return false;
    }
    get(variable) {
        variable = variable.toUpperCase();
        let x = 0;
        for (var temp = this; temp != null; temp = temp.anterior) {
            if (temp.tabla.has(variable)) {
                var result = temp.tabla.get(variable);
                if (result) {
                    return result;
                }
            }
            x++;
        }
        //Error
        return new simbolo_1.default(new tipo_1.default(tipo_1.tipos.ERROR), 'ERROR', undefined);
    }
    getLocal(variable) {
        variable = variable.toUpperCase();
        if (this.tabla.has(variable)) {
            var result = this.tabla.get(variable);
            if (result) {
                return result;
            }
        }
        return new simbolo_1.default(new tipo_1.default(tipo_1.tipos.ERROR), 'ERROR', undefined);
    }
}
exports.default = Entorno;
//# sourceMappingURL=Entorno.js.map