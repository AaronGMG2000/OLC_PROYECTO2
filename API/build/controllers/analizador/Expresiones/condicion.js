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
const tipo_1 = __importStar(require("../tablaSimbolo/tipo"));
const expresion_1 = require("./expresion");
const literal_1 = __importDefault(require("./literal"));
class condicion extends expresion_1.Expresion {
    constructor(linea, columna, valor, operador, iz, der) {
        super(linea, columna, valor, new tipo_1.default(tipo_1.tipos.BOOLEANO));
        this.operador = "";
        if (der) {
            this.ExpresionDerecha = der;
        }
        this.ExpresionIzquierda = iz;
        this.operador = operador;
    }
    getValor(arbol, tabla) {
        var izquierda;
        var derecha;
        if (this.ExpresionIzquierda) {
            izquierda = this.ExpresionIzquierda.getValor(arbol, tabla);
        }
        if (this.ExpresionDerecha) {
            derecha = this.ExpresionDerecha.getValor(arbol, tabla);
        }
        switch (this.operador) {
            case "<":
                switch (izquierda === null || izquierda === void 0 ? void 0 : izquierda.Tipo.tipos) {
                    case tipo_1.tipos.ENTERO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CARACTER:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CADENA:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor.toChar)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    case tipo_1.tipos.DOBLE:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.BOOLEANO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) < (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    default:
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
            case ">":
                switch (izquierda === null || izquierda === void 0 ? void 0 : izquierda.Tipo.tipos) {
                    case tipo_1.tipos.ENTERO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CARACTER:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CADENA:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor.toChar)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    case tipo_1.tipos.DOBLE:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.BOOLEANO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) > (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    default:
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
            case "<=":
                switch (izquierda === null || izquierda === void 0 ? void 0 : izquierda.Tipo.tipos) {
                    case tipo_1.tipos.ENTERO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CARACTER:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CADENA:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor.toChar)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    case tipo_1.tipos.DOBLE:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.BOOLEANO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) <= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    default:
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
            case ">=":
                switch (izquierda === null || izquierda === void 0 ? void 0 : izquierda.Tipo.tipos) {
                    case tipo_1.tipos.ENTERO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CARACTER:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CADENA:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor.toChar)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    case tipo_1.tipos.DOBLE:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.BOOLEANO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) >= (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    default:
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
            case "==":
                switch (izquierda === null || izquierda === void 0 ? void 0 : izquierda.Tipo.tipos) {
                    case tipo_1.tipos.ENTERO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CARACTER:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CADENA:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor.toChar)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    case tipo_1.tipos.DOBLE:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.BOOLEANO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) === (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    default:
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
            case "!=":
                switch (izquierda === null || izquierda === void 0 ? void 0 : izquierda.Tipo.tipos) {
                    case tipo_1.tipos.ENTERO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CARACTER:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor.charCodeAt()) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.CADENA:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor.toChar)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    case tipo_1.tipos.DOBLE:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor.charCodeAt())) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.ENTERO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.DOBLE:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                        }
                    case tipo_1.tipos.BOOLEANO:
                        switch (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) {
                            case tipo_1.tipos.BOOLEANO:
                                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor) !== (derecha === null || derecha === void 0 ? void 0 : derecha.valor)) {
                                    return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                                }
                                return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                            case tipo_1.tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                            case tipo_1.tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                        }
                    default:
                        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
                }
            case "!":
                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.Tipo.tipos) === tipo_1.tipos.BOOLEANO) {
                    if (!(izquierda === null || izquierda === void 0 ? void 0 : izquierda.valor)) {
                        return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                    }
                    return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                }
                arbol.num_error++;
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Se esperaba tipo booleano", this.linea, this.columna));
            case "&&":
                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.Tipo.tipos) === tipo_1.tipos.BOOLEANO && (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) === tipo_1.tipos.BOOLEANO) {
                    if (izquierda.valor && derecha.valor) {
                        return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                    }
                    return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                }
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Se esperaba tipo booleano", this.linea, this.columna));
            case "||":
                if ((izquierda === null || izquierda === void 0 ? void 0 : izquierda.Tipo.tipos) === tipo_1.tipos.BOOLEANO && (derecha === null || derecha === void 0 ? void 0 : derecha.Tipo.tipos) === tipo_1.tipos.BOOLEANO) {
                    if (izquierda.valor || derecha.valor) {
                        return new literal_1.default(this.linea, this.columna, true, tipo_1.tipos.BOOLEANO);
                    }
                    return new literal_1.default(this.linea, this.columna, false, tipo_1.tipos.BOOLEANO);
                }
                arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Se esperaba tipo booleano", this.linea, this.columna));
        }
        return new literal_1.default(this.linea, this.columna, undefined, tipo_1.tipos.ERROR);
    }
}
exports.default = condicion;
//# sourceMappingURL=condicion.js.map