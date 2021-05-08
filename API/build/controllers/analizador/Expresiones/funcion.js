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
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const expresion_1 = require("./expresion");
const Entorno_1 = __importDefault(require("../tablaSimbolo/Entorno"));
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
const literal_1 = __importDefault(require("./literal"));
const nodoAST_1 = require("../Abstract/nodoAST");
class FUNCION extends expresion_1.Expresion {
    constructor(linea, columna, nombre, parametros) {
        const tip = new tipo_1.default(tipo_1.tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.nombre = nombre;
        this.parametros = parametros;
    }
    getValor(arbol, tabla) {
        let Nuevo_Entorno = new Entorno_1.default(this.nombre, tabla);
        let nombre_nuevo = this.nombre + "#";
        let nombre_nuevo2 = this.nombre + "#";
        let calculo = [];
        if (this.parametros) {
            for (let par of this.parametros) {
                let varr = par.getValor(arbol, tabla);
                nombre_nuevo += "" + varr.Tipo.tipos;
                if (varr.Tipo.tipos === tipo_1.tipos.ENTERO) {
                    nombre_nuevo2 += "" + tipo_1.tipos.DOBLE;
                }
                else {
                    nombre_nuevo2 += "" + varr.Tipo.tipos;
                }
                calculo.push(varr);
            }
        }
        var comprobar = arbol.global.get(nombre_nuevo);
        var comprobar2 = arbol.global.get(nombre_nuevo2);
        if (comprobar.tipo.tipos !== tipo_1.tipos.ERROR || comprobar2.tipo.tipos !== tipo_1.tipos.ERROR) {
            let func = undefined;
            if (comprobar.tipo.tipos !== tipo_1.tipos.ERROR) {
                func = comprobar.valor;
            }
            else {
                func = comprobar2.valor;
            }
            if (func.PARAMETRO) {
                let x = 0;
                for (let declaracion of func.PARAMETRO) {
                    let yy = calculo[x];
                    yy.linea = declaracion.linea;
                    yy.columna = declaracion.columna;
                    declaracion.exp = yy;
                    declaracion.ejecutar(arbol, Nuevo_Entorno);
                    x++;
                }
            }
            arbol.pilaFuncion.push("funcion");
            for (let element of func.INSTRUCCION) {
                if (typeof (element) !== typeof ("")) {
                    let res = element.ejecutar(arbol, Nuevo_Entorno);
                    if (typeof (res) === typeof ({}) && !(res instanceof expresion_1.Expresion)) {
                        if (res.nombre === "RETURN") {
                            if (arbol.pilaFuncion.length > 0) {
                                let retorno = res.retorno;
                                if (retorno) {
                                    if (func.tipo.tipos === retorno.Tipo.tipos ||
                                        (func.tipo.tipos === tipo_1.tipos.ENTERO && retorno.Tipo.tipos === tipo_1.tipos.DOBLE
                                            || func.tipo.tipos === tipo_1.tipos.DOBLE && retorno.Tipo.tipos === tipo_1.tipos.ENTERO)) {
                                        let rest = retorno.getValor(arbol, Nuevo_Entorno);
                                        if (rest.Tipo.tipos === tipo_1.tipos.ERROR) {
                                            arbol.num_error++;
                                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTIO", "Error en valor de retorno", this.linea, this.columna));
                                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                        }
                                        rest.nombre = "FUNCION";
                                        arbol.pilaFuncion.pop();
                                        return rest;
                                    }
                                    else {
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTIO", "El tipo del retorno no coincide con el de la función", this.linea, this.columna));
                                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                    }
                                }
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.CADENA);
                            }
                            else {
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                        }
                        if (res.nombre === "BREAK") {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTIO", "No se puede utilizar break dentro de una función", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                        if (res.nombre === "CONTINUE") {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTIO", "No se puede utilizar continue dentro de una función", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    }
                }
            }
            if (!func.vector) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Se esperaba return", this.linea, this.columna));
                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
            }
            arbol.pilaFuncion.pop();
            return;
        }
        else {
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se encontro la función", this.linea, this.columna));
            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("LLAMADA");
        nodo.agregarHijo(this.nombre);
        nodo.agregarHijo("(");
        if (this.parametros) {
            let nodo2 = new nodoAST_1.nodoAST("PARAMETROS");
            for (let element of this.parametros) {
                if (typeof (this.parametros) !== typeof ("")) {
                    nodo2.agregarHijo(undefined, undefined, element.getNodo());
                }
            }
            nodo.agregarHijo(undefined, undefined, nodo2);
        }
        nodo.agregarHijo(")");
        return nodo;
    }
}
exports.default = FUNCION;
//# sourceMappingURL=funcion.js.map