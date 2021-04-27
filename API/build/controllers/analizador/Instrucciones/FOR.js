"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const Entorno_1 = __importDefault(require("../tablaSimbolo/Entorno"));
const tipo_1 = require("../tablaSimbolo/tipo");
class FOR extends instruccion_1.Instruccion {
    constructor(linea, columna, declaracion, condicion, actualizacion, bloque1, tipo) {
        super(linea, columna);
        this.tipo = "";
        this.condicion = condicion;
        this.bloque1 = bloque1;
        this.actualizacion = actualizacion;
        this.declaracion = declaracion;
        this.tipo = tipo;
    }
    ejecutar(arbol, tabla) {
        let Nuevo_Entorno = new Entorno_1.default("FOR", tabla);
        let dec = undefined;
        if (this.tipo === "DEC") {
            dec = this.declaracion.ejecutar(arbol, Nuevo_Entorno);
        }
        else {
            dec = this.declaracion.ejecutar(arbol, tabla);
        }
        if (dec) {
            let condicion = undefined;
            if (this.tipo === "DEC") {
                condicion = this.condicion.getValor(arbol, Nuevo_Entorno);
            }
            else {
                condicion = this.condicion.getValor(arbol, tabla);
            }
            if (condicion.Tipo.tipos === tipo_1.tipos.BOOLEANO) {
                let cont = false;
                let bre = false;
                arbol.pilaCiclo.push("ciclo");
                while (condicion.valor) {
                    let Entorno_bloque = new Entorno_1.default("FOR", Nuevo_Entorno);
                    for (let elemento of this.bloque1) {
                        if (typeof (elemento) !== typeof ("")) {
                            let res = elemento.ejecutar(arbol, Entorno_bloque);
                            if (typeof (res) === typeof ([])) {
                                if (res.nombre === "RETURN") {
                                    if (arbol.pilaFuncion.length > 0) {
                                        return res;
                                    }
                                    else {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                    }
                                }
                                if (res.nombre === "CONTINUE") {
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
                        if (this.tipo === "DEC") {
                            this.actualizacion.ejecutar(arbol, Nuevo_Entorno);
                            condicion = this.condicion.getValor(arbol, Nuevo_Entorno);
                        }
                        else {
                            this.actualizacion.ejecutar(arbol, tabla);
                            condicion = this.condicion.getValor(arbol, tabla);
                        }
                        continue;
                    }
                    if (bre) {
                        break;
                    }
                    if (this.tipo === "DEC") {
                        this.actualizacion.ejecutar(arbol, Nuevo_Entorno);
                        condicion = this.condicion.getValor(arbol, Nuevo_Entorno);
                    }
                    else {
                        this.actualizacion.ejecutar(arbol, tabla);
                        condicion = this.condicion.getValor(arbol, tabla);
                    }
                }
                arbol.pilaCiclo.pop();
            }
        }
        //ERROR
    }
}
exports.default = FOR;
//# sourceMappingURL=FOR.js.map