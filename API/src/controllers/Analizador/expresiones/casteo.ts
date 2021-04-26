import Excepcion from "../exceptions/Excepcion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";
import Literal from "./literal";

export default class CASTEO extends Expresion {
    public exp:Expresion|undefined;
    public tipo:Tipo;
    constructor(linea:number, columna:number, valor:any, tipo:Tipo, exp:Expresion){
        super(linea,columna,valor,new Tipo(tipos.BOOLEANO));
        this.exp = exp;
        this.tipo = tipo;
    }

    getValor(arbol: ArbolAST, tabla: Entorno):Expresion {
        let valor = this.exp?.getValor(arbol, tabla);
        switch(this.tipo.tipos){
            case tipos.CADENA:
                return new Literal(this.linea, this.columna, valor?.valor.toString(), tipos.CADENA);
            case tipos.BOOLEANO:
                return new Literal(this.linea, this.columna, "error", tipos.ERROR);
            case tipos.DOBLE:
                switch(valor?.Tipo.tipos){
                    case tipos.BOOLEANO:
                        return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                    case tipos.CARACTER:
                        return new Literal(this.linea, this.columna, valor.valor.charCodeAt(), tipos.DOBLE);
                    case tipos.CADENA:
                        return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                    case tipos.ENTERO:
                        return new Literal(this.linea, this.columna, Number(valor.valor), tipos.DOBLE);
                    case tipos.DOBLE:
                        return new Literal(this.linea, this.columna, valor.valor, tipos.DOBLE);
                }
            case tipos.ENTERO:
                switch(valor?.Tipo.tipos){
                    case tipos.BOOLEANO:
                        return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                    case tipos.CARACTER:
                        return new Literal(this.linea, this.columna, valor.valor.charCodeAt(), tipos.ENTERO);
                    case tipos.CADENA:
                        return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                    case tipos.ENTERO:
                        return new Literal(this.linea, this.columna, Number(valor.valor), tipos.ENTERO);
                    case tipos.DOBLE:
                        return new Literal(this.linea, this.columna, Math.trunc(valor.valor), tipos.ENTERO);
                }
            case tipos.CARACTER:
                switch(valor?.Tipo.tipos){
                    case tipos.BOOLEANO:
                        return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                    case tipos.CARACTER:
                        return new Literal(this.linea, this.columna, valor.valor, tipos.ENTERO);
                    case tipos.CADENA:
                        return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                    case tipos.ENTERO:
                        console.log(String.fromCharCode(valor.valor));
                        return new Literal(this.linea, this.columna, String.fromCharCode(valor.valor), tipos.CARACTER);
                    case tipos.DOBLE:
                        return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                }
        }
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }
}
