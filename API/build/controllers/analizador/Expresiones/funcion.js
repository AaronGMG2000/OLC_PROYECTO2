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
class FUNCION extends expresion_1.Expresion {
    constructor(linea, columna, nombre, parametros) {
        const tip = new tipo_1.default(tipo_1.tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.nombre = nombre;
        this.parametros = parametros;
    }
    getValor(arbol, tabla) {
        let Nuevo_Entorno = new Entorno_1.default(this.nombre, arbol.global);
        let nombre_nuevo = this.nombre + "#";
        if (this.parametros) {
            for (let par of this.parametros) {
                let varr = par.getValor(arbol, tabla);
                nombre_nuevo += "" + varr.Tipo.tipos;
            }
        }
        var comprobar = arbol.global.get(nombre_nuevo);
        if (comprobar.tipo.tipos !== tipo_1.tipos.ERROR) {
            let func = comprobar.valor;
            if (func.PARAMETRO) {
                let x = 0;
                for (let declaracion of func.PARAMETRO) {
                    declaracion.exp = this.parametros[x].getValor(arbol, tabla);
                    declaracion.ejecutar(arbol, Nuevo_Entorno);
                    x++;
                }
            }
            arbol.pilaFuncion.push("funcion");
            for (let element of func.INSTRUCCION) {
                let res = element.ejecutar(arbol, Nuevo_Entorno);
                if (typeof (res) === typeof ([])) {
                    if (res.nombre === "RETURN") {
                        if (arbol.pilaFuncion.length > 0) {
                            let retorno = res.retorno;
                            if (func.tipo.tipos === retorno.Tipo.tipos && !func.vector) {
                                let rest = retorno.getValor(tabla, Nuevo_Entorno);
                                if (rest.Tipo.tipos === tipo_1.tipos.ERROR) {
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTIO", "Error en valor de retorno", this.linea, this.columna));
                                    return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                                }
                                rest.nombre = "FUNCION";
                                return rest;
                            }
                            else if (func.vector) {
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SINTACTICO", "Función void no puede tener valor de retorno", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            }
                        }
                        else {
                            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                            return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    }
                }
            }
            if (func.vector) {
                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.CADENA, true);
            }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Se esperaba un valor numerico", this.linea, this.columna));
        return new literal_1.default(this.linea, this.columna, "ERROR", tipo_1.tipos.ERROR);
    }
}
exports.default = FUNCION;
//# sourceMappingURL=funcion.js.map