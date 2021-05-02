import { nodoAST } from "../Abstract/nodoAST";
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
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede hacer casteo de un string", this.linea, this.columna));
                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
            case tipos.BOOLEANO:
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede hacer casteo de double", this.linea, this.columna));
                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
            case tipos.DOBLE:
                switch(valor?.Tipo.tipos){
                    case tipos.BOOLEANO:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede hacer casteo de double a boolean", this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    case tipos.CARACTER:
                        return new Literal(this.linea, this.columna, valor.valor.charCodeAt(), tipos.DOBLE);
                    case tipos.CADENA:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede hacer casteo de double a string", this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    case tipos.ENTERO:
                        return new Literal(this.linea, this.columna, Number(valor.valor), tipos.DOBLE);
                    case tipos.DOBLE:
                        return new Literal(this.linea, this.columna, valor.valor, tipos.DOBLE);
                }
            case tipos.ENTERO:
                switch(valor?.Tipo.tipos){
                    case tipos.BOOLEANO:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede hacer casteo de int a boolean", this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    case tipos.CARACTER:
                        return new Literal(this.linea, this.columna, valor.valor.charCodeAt(), tipos.ENTERO);
                    case tipos.CADENA:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede hacer casteo de int a string", this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    case tipos.ENTERO:
                        return new Literal(this.linea, this.columna, Number(valor.valor), tipos.ENTERO);
                    case tipos.DOBLE:
                        return new Literal(this.linea, this.columna, Math.trunc(valor.valor), tipos.ENTERO);
                }
            case tipos.CARACTER:
                switch(valor?.Tipo.tipos){
                    case tipos.BOOLEANO:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede hacer casteo de caracter a boolean", this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    case tipos.CARACTER:
                        return new Literal(this.linea, this.columna, valor.valor, tipos.ENTERO);
                    case tipos.CADENA:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede hacer casteo de caracter a cadena", this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    case tipos.ENTERO:
                        console.log(String.fromCharCode(valor.valor));
                        return new Literal(this.linea, this.columna, String.fromCharCode(valor.valor), tipos.CARACTER);
                    case tipos.DOBLE:
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede hacer casteo de caracter a double", this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","La variable indicada no esta declarada", this.linea, this.columna));
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }

    getNodo():nodoAST{
        let nodo = new nodoAST("CASTEO");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.Tipo.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo(undefined, undefined, this.exp?.getNodo());
        return nodo;
    }
}
