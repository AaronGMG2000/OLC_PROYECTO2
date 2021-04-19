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
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.ENTERO));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.BOOLEANO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.CADENA:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.CADENA:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor + derecha.valor, new Tipo(tipos.CADENA));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            //Error
                            break;
                    } 
                }else{
                    //ERROR
                }
                break;
            case OperadorAritmetico.RESTA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.ENTERO));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.BOOLEANO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.BOOLEANO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor - derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            break;
                    } 
                }else if(!derecha && izquierda){
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            return new Literal(this.linea, this.columna, -izquierda.valor, new Tipo(tipos.ENTERO));
                        case tipos.DOBLE:
                            return new Literal(this.linea, this.columna, -izquierda.valor, new Tipo(tipos.DOBLE));
                        default:
                            break;
                    }
                }else{
                    //ERROR
                }
                break;
            case OperadorAritmetico.MULTIPLICACION:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, new Tipo(tipos.DOBLE));
                                    case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, new Tipo(tipos.ENTERO));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor * derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            //Error
                            break;
                    } 
                }else{
                    //ERROR
                }
                break;
            case OperadorAritmetico.DIVISION:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.CARACTER:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.CARACTER:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor / derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            break;
                    } 
                }else{
                    //ERROR
                }
                break;
            case OperadorAritmetico.POTENCIA:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor ^ derecha.valor, new Tipo(tipos.ENTERO));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor ^ derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor ^ derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor ^ derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            break;
                    } 
                }else{
                    //ERROR
                }
                break;
            case OperadorAritmetico.MODULO:
                if (izquierda && derecha) {
                    switch (izquierda.Tipo.tipos) {
                        case tipos.ENTERO:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor % derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor % derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        case tipos.DOBLE:
                            switch (derecha.Tipo.tipos) {
                                case tipos.ENTERO:
                                    return new Literal(this.linea, this.columna, izquierda.valor % derecha.valor, new Tipo(tipos.DOBLE));
                                case tipos.DOBLE:
                                    return new Literal(this.linea, this.columna, izquierda.valor % derecha.valor, new Tipo(tipos.DOBLE));
                                default:
                                    //Error
                                    break;
                            }
                            break;
                        default:
                            break;
                    } 
                }else{
                    //ERROR
                }
                break;
            default:
                break;
        }
     return this;
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