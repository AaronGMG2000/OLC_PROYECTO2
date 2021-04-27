import Excepcion from "../exceptions/Excepcion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";
import Literal from "./literal";

export default class Aritmetica extends Expresion {
    public ExpresionIzquierda:Expresion|undefined;
    public ExpresionDerecha: Expresion|undefined;
    private operador:OperadorAritmetico;
    constructor(operador:OperadorAritmetico, linea:number, columna:number, valor:any, Tipo:Tipo, iz:Expresion, der?:Expresion){
        super(linea,columna,valor,Tipo);
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
        switch (this.operador) {
            case OperadorAritmetico.SUMA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.ENTERO);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.DOBLE);
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.ENTERO);
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor.charCodeAt(), tipos.ENTERO);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);                           
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.DOBLE);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.DOBLE);
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.DOBLE);
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor.charCodeAt(), tipos.DOBLE);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                            break;
                        case tipos.BOOLEANO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.ENTERO);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.DOBLE);
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar suma entre 2 booleanos",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CARACTER:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar suma entre un booleano y un caracter",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                            break;
                        case tipos.CADENA:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                            break;
                        case tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor.charCodeAt() + derecha.valor, tipos.ENTERO);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor.charCodeAt() + derecha.valor, tipos.DOBLE);
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, tipos.CADENA);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar suma entre un booleano y un caracter",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                            break;
                        default:
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    } 
                }
                break;
            case OperadorAritmetico.RESTA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, tipos.ENTERO);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, tipos.DOBLE);
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, tipos.ENTERO);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor.charCodeAt(), tipos.ENTERO);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una resta entre int y boolean",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, tipos.DOBLE);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, tipos.DOBLE);
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor.charCodeAt(), tipos.DOBLE);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una resta entre un double y un boolean",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                            break;
                        case tipos.BOOLEANO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, tipos.ENTERO);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una resta entre un booleano y un caracter",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una resta entre un booleano y un string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una resta entre 2 booleanos",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor.charCodeAt() - derecha.valor, tipos.ENTERO);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor.charCodeAt() - derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una resta entre 2 caracteres",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una resta entre un caracter y un string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una resta entre un caracter y un boolean",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipos.BOOLEANO:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una resta con un string",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        default:
                            break;
                    } 
                }else if(!derecha && izquierda){
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            return new Literal(this.linea, this.columna, -izquierda.valor, tipos.ENTERO);
                        case tipos.DOBLE:
                            return new Literal(this.linea, this.columna, -izquierda.valor, tipos.DOBLE);
                        case tipos.CADENA:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar negación a un string",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        case tipos.BOOLEANO:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar negación a un booleano",this.linea, this.columna));    
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        case tipos.CARACTER:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar negación a un caracter",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        default:
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            break;
                    }
                }else{
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
                break;
            case OperadorAritmetico.MULTIPLICACION:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, tipos.ENTERO);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, tipos.ENTERO);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una multiplicación entre int y string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una multiplicación entre int y un booleano",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, tipos.DOBLE);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, tipos.DOBLE);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una multiplicación double y cadena",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una multiplicación entre double y boolean",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                        case tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor.charCodeAt() * derecha.valor, tipos.ENTERO);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor.charCodeAt() * derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una multiplicación entre caracteres",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una multiplicación entre caracter y string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una multiplicación entre caracter y boolean",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                   
                            }
                        case tipos.CADENA:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una multiplicación con un string",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        case tipos.BOOLEANO:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una multiplicación con un boolean",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        default:
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
            
                    } 
                }else{
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
            case OperadorAritmetico.DIVISION:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, tipos.DOBLE);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor.charCodeAt(), tipos.DOBLE);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una división entre un int y un string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una división entre un int y un boolean",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, tipos.DOBLE);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor.charCodeAt(), tipos.DOBLE);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una división entre un double y un string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                        arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una división entre un double y un boolean",this.linea, this.columna));
                                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor.charCodeAt() / derecha.valor, tipos.DOBLE);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor.charCodeAt() / derecha.valor, tipos.DOBLE);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una división entre un caracter y un string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CARACTER:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una división entre un 2 caracter",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una división entre un caracter y un boolean",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipos.CADENA:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una división con string",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        case tipos.BOOLEANO:
                                arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una división con boolean",this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        default:
                            break;
                    } 
                }else{
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
                break;
            case OperadorAritmetico.POTENCIA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    console.log(izquierda.valor^derecha.valor);
                                    return new Literal(this.linea, this.columna, Math.pow(izquierda.valor, derecha.valor), tipos.ENTERO);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, Math.pow(izquierda.valor, derecha.valor), tipos.DOBLE);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una potencia entre un int y un boolean",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una potencia entre un int y un string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CARACTER:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una potencia entre un int y un cadacter",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, Math.pow(izquierda.valor, derecha.valor), tipos.DOBLE);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, Math.pow(izquierda.valor, derecha.valor), tipos.DOBLE);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una potencia entre un double y un boolean",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una potencia entre un double y un string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CARACTER:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una potencia entre un double y un cadacter",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                    break;
                            }
                            break;
                        case tipos.CARACTER:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una potencia con un string",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        case tipos.CADENA:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una potencia con un caracter",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        case tipos.BOOLEANO:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar una potencia con un booleano",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        default:
                            break;
                    } 
                }else{
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
                break;
            case OperadorAritmetico.MODULO:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor % derecha.valor, tipos.DOBLE);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor % derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar modulo con un int y un string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar modulo con un int y un caracter",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar modulo con un int y un booleano",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor % derecha.valor, tipos.DOBLE);
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor % derecha.valor, tipos.DOBLE);
                                case tipos.CARACTER:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar modulo con un double y un string",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.CADENA:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar modulo con un double y un caracter",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                case tipos.BOOLEANO:
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar modulo con un double y un booleano",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                default:
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                        case tipos.CARACTER:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar modulo con un string",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        case tipos.CADENA:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar modulo con un caracter",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        case tipos.BOOLEANO:
                            arbol.errores.push(new Excepcion(arbol.num_error,"SINTACTICO","No se puede realizar modulo con un booleano",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        default:
                            break;
                    } 
                }else{
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
                break;
        }
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }
}

export enum OperadorAritmetico{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO
}