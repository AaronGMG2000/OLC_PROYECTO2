"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Entorno_1 = __importDefault(require("../tablaSimbolo/Entorno"));
const tipo_1 = require("../tablaSimbolo/tipo");
class WHILE extends instruccion_1.Instruccion {
    constructor(linea, columna, condicion1, bloque1) {
        super(linea, columna);
        this.condicion1 = condicion1;
        this.bloque1 = bloque1;
    }
    ejecutar(arbol, tabla) {
        let condicion = this.condicion1.getValor(arbol, tabla);
        if (condicion.Tipo.tipos === tipo_1.tipos.BOOLEANO) {
            let Nuevo_Entorno = new Entorno_1.default("WHILE", tabla);
            let cont = false;
            let bre = false;
            while (condicion.valor) {
                for (let elemento of this.bloque1) {
                    if (typeof (elemento) !== typeof ("")) {
                        let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                        if (typeof (res) === typeof ([])) {
                            if (res.nombre === "return") {
                            }
                            else if (res.nombre === "CONTINUE") {
                                cont = true;
                                break;
                            }
                            else if (res.nombre === "BREAK") {
                                bre = true;
                                break;
                            }
                        }
                    }
                    else {
                        console.log(arbol.errores);
                    }
                }
                if (cont) {
                    cont = false;
                    continue;
                }
                if (bre) {
                    break;
                }
                condicion = this.condicion1.getValor(arbol, tabla);
            }
        }
        //ERROR
    }
}
exports.default = WHILE;
//# sourceMappingURL=while.js.map