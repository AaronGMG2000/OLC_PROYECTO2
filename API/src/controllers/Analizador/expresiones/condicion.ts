import { nodoAST } from "../Abstract/nodoAST";
import Excepcion from "../exceptions/Excepcion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";
import Literal from "./literal";

export default class condicion extends Expresion {
    public ExpresionIzquierda:Expresion|undefined;
    public ExpresionDerecha: Expresion|undefined;
    public operador = "";
    constructor(linea:number, columna:number, valor:any, operador:string, iz:Expresion, der?:Expresion){
        super(linea,columna,valor,new Tipo(tipos.BOOLEANO));
        if (der) {
            this.ExpresionDerecha =der;
        }
        this.ExpresionIzquierda = iz;
        this.operador = operador;
    }

    getValor(arbol: ArbolAST, tabla: Entorno):Expresion {
        var izquierda:Expresion|undefined;
        var derecha:Expresion|undefined;
        if (this.ExpresionIzquierda) {
            izquierda = this.ExpresionIzquierda.getValor(arbol, tabla);
        }
        if (this.ExpresionDerecha) {
            derecha = this.ExpresionDerecha.getValor(arbol, tabla);
        }

        switch(this.operador){
            case "<":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor < derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() < derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor < derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor < derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
            case ">":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor > derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() > derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor > derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor > derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
            case "<=":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor <= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() <= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor <= derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor <= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }

            case ">=":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor >= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() >= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor >= derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor >= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }

            case "==":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor === derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() === derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor === derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }


            case "!=":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor !== derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() !== derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor !== derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor !== derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }

            case "!":
                if (izquierda?.Tipo.tipos===tipos.BOOLEANO) {
                    if (!izquierda?.valor) {
                        return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                    }
                    return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                }
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba tipo booleano",this.linea, this.columna));
            case "&&":
                if (izquierda?.Tipo.tipos===tipos.BOOLEANO && derecha?.Tipo.tipos===tipos.BOOLEANO) {
                    if (izquierda.valor && derecha.valor) {
                        return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                    }
                    return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                }
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba tipo booleano",this.linea, this.columna));
            case "||":
                if (izquierda?.Tipo.tipos===tipos.BOOLEANO && derecha?.Tipo.tipos===tipos.BOOLEANO) {
                    if (izquierda.valor || derecha.valor) {
                        return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                    }
                    return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                }
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba tipo booleano",this.linea, this.columna));
        }
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }

    getNodo():nodoAST{
        let nodo = new nodoAST("CONDICION");
        if (this.ExpresionDerecha && this.ExpresionIzquierda) {
            nodo.agregarHijo(undefined,undefined,this.ExpresionIzquierda.getNodo());
            nodo.agregarHijo(this.operador);
            nodo.agregarHijo(undefined,undefined,this.ExpresionDerecha.getNodo());
        }else if (this.ExpresionIzquierda) {
            nodo.agregarHijo(this.operador);
            nodo.agregarHijo(undefined,undefined,this.ExpresionIzquierda.getNodo());
        }
        return nodo;
    }
    
}
