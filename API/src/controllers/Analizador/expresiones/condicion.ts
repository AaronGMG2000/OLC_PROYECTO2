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
                if (izquierda?.valor < derecha?.valor) {
                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                }
                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
            case ">":
                if (izquierda?.valor > derecha?.valor) {
                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                }
                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
            case "<=":
                if (izquierda?.valor <= derecha?.valor) {
                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                }
                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
            case ">=":
                if (izquierda?.valor >= derecha?.valor) {
                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                }
                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
            case "==":
                if (izquierda?.valor == derecha?.valor) {
                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                }
                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
            case "!=":
                if (izquierda?.valor != derecha?.valor) {
                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                }
                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
            case "!":
                if (izquierda?.Tipo.tipos===tipos.BOOLEANO) {
                    if (!izquierda?.valor) {
                        return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                    }
                    return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                }
                arbol.errores.push(new Excepcion("SEMANTICO","Se esperaba tipo booleano",this.linea, this.columna));
            case "&&":
                if (izquierda?.Tipo.tipos===tipos.BOOLEANO && derecha?.Tipo.tipos===tipos.BOOLEANO) {
                    if (izquierda.valor && derecha.valor) {
                        return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                    }
                    return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                }
                arbol.errores.push(new Excepcion("SEMANTICO","Se esperaba tipo booleano",this.linea, this.columna));
            case "||":
                if (izquierda?.Tipo.tipos===tipos.BOOLEANO && derecha?.Tipo.tipos===tipos.BOOLEANO) {
                    if (izquierda.valor === derecha.valor) {
                        return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                    }
                    return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                }
                arbol.errores.push(new Excepcion("SEMANTICO","Se esperaba tipo booleano",this.linea, this.columna));
        }
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }
}
