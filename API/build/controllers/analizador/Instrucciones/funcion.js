"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../Abstract/instruccion");
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const ListaSimbolos_1 = __importDefault(require("../tablaSimbolo/ListaSimbolos"));
const tipo_1 = require("../tablaSimbolo/tipo");
class FUNCIONF extends instruccion_1.Instruccion {
    constructor(linea, columna, tipo, nombre, INS, Parametro, vector = false) {
        super(linea, columna);
        this.registrada = false;
        this.reg = false;
        this.tipo = tipo;
        this.nombre = nombre;
        this.INSTRUCCION = INS;
        this.PARAMETRO = Parametro;
        this.vector = vector;
    }
    ejecutar(arbol, tabla) {
        let up = this.nombre.toUpperCase();
        if (up === "LENGTH" || up === "TRUNCATE" || up === "ROUND"
            || up === "TYPEOF" || up === "TOSTRING" || up === "TOCHARARRAY") {
            arbol.num_error++;
            arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Existe una función nativa con este nombre", this.linea, this.columna));
            return;
        }
        this.nombre += "#";
        if (this.PARAMETRO) {
            for (let par of this.PARAMETRO) {
                this.nombre += "" + par.tipo.tipos;
            }
        }
        var comprobar = tabla.get(this.nombre);
        if (comprobar.tipo.tipos === tipo_1.tipos.ERROR) {
            if (!this.reg) {
                if (this.vector) {
                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, this.nombre, "METODO", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));
                }
                else {
                    arbol.lista_simbolos.push(new ListaSimbolos_1.default(arbol.lista_simbolos.length, this.nombre, "FUNCION", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));
                }
                this.reg = true;
            }
            tabla.set(this.nombre, this, this.tipo, -1, -1);
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion_1.default(arbol.num_error, "SEMANTICO", "Ya existe una función con el nombre indicado", this.linea, this.columna));
        return;
        // ERROR
    }
}
exports.default = FUNCIONF;
//# sourceMappingURL=funcion.js.map