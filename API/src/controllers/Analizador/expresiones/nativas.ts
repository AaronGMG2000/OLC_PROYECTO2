import { nodoAST } from "../Abstract/nodoAST";
import Excepcion from "../exceptions/Excepcion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Simbolo from "../tablaSimbolo/simbolo";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";
import Literal from "./literal";
import VARIABLE from "./variable";

export default class NATIVA extends Expresion {
    public nombre:string;
    public exp:Expresion;
    constructor(linea:number, columna:number, nombre:string, exp:Expresion){
        super(linea,columna, undefined,new Tipo(tipos.CADENA));
        this.nombre = nombre;
        this.exp = exp;
    }

    getValor(arbol: ArbolAST, tabla: Entorno):Expresion {
        let valor = this.exp.getValor(arbol, tabla);
        if (valor) {
            let comp:any = undefined;
            if (this.exp instanceof VARIABLE) {
                comp = tabla.get(this.exp.nombre);
            }
            switch(this.nombre.toUpperCase()){
                case "LENGTH":
                    if (!(valor.valor instanceof Array) && typeof(valor.valor)!== typeof("")) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","El valor ingresado no es una lista o vector o string",this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    }
                    return new Literal(this.linea, this.columna, valor.valor.length, tipos.ENTERO);
                case "TRUNCATE":
                    if (typeof(valor.valor) !== typeof(1)) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","El valor ingresado no es un int o un double",this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    }
                    return new Literal(this.linea, this.columna, Math.trunc(valor.valor), tipos.ENTERO);
                case "ROUND":
                    if (typeof(valor.valor) !== typeof(1)) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","El valor ingresado no es un int o un double",this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    }
                    return new Literal(this.linea, this.columna, Math.round(valor.valor), tipos.ENTERO);
                case "TYPEOF":
                    switch(valor.Tipo.tipos){
                        case tipos.ENTERO:
                            if (comp instanceof Simbolo) {
                                if (comp.LOV==="VECTOR") {
                                    return new Literal(this.linea, this.columna, "INT[]", tipos.CADENA);
                                }else{
                                    return new Literal(this.linea, this.columna, "LIST<INT>", tipos.CADENA);
                                }
                            }
                            return new Literal(this.linea, this.columna, "INT", tipos.CADENA);
                        case tipos.BOOLEANO:
                            if (comp instanceof Simbolo) {
                                if (comp.LOV==="VECTOR") {
                                    return new Literal(this.linea, this.columna, "BOOLEAN[]", tipos.CADENA);
                                }else{
                                    return new Literal(this.linea, this.columna, "LIST<BOOLEAN>", tipos.CADENA);
                                }
                            }
                            return new Literal(this.linea, this.columna, "BOOLEAN", tipos.CADENA);
                        case tipos.CARACTER:
                            if (comp instanceof Simbolo) {
                                if (comp.LOV==="VECTOR") {
                                    return new Literal(this.linea, this.columna, "CHAR[]", tipos.CADENA);
                                }else{
                                    return new Literal(this.linea, this.columna, "LIST<CHAR>", tipos.CADENA);
                                }
                            }
                            return new Literal(this.linea, this.columna, "CHAR", tipos.CADENA);
                        case tipos.DOBLE:
                            if (comp instanceof Simbolo) {
                                if (comp.LOV==="VECTOR") {
                                    return new Literal(this.linea, this.columna, "DOUBLE[]", tipos.CADENA);
                                }else{
                                    return new Literal(this.linea, this.columna, "LIST<DOUBLE>", tipos.CADENA);
                                }
                            }
                            return new Literal(this.linea, this.columna, "DOUBLE", tipos.CADENA);
                        case tipos.CADENA:
                            if (comp instanceof Simbolo) {
                                if (comp.LOV==="VECTOR") {
                                    return new Literal(this.linea, this.columna, "STRING[]", tipos.CADENA);
                                }else{
                                    return new Literal(this.linea, this.columna, "LIST<STRING>", tipos.CADENA);
                                }
                            }
                            return new Literal(this.linea, this.columna, "STRING", tipos.CADENA);
                        default:
                            return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                    }
                case "TOSTRING":
                    if (valor.valor instanceof Literal) {
                        if (valor.valor.valor instanceof Array) {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","No se puede convertir un vector o lista en string",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                        }
                    }
                    return new Literal(this.linea, this.columna, String(valor.valor), tipos.CADENA);
                case "TOCHARARRAY":
                    if (typeof(valor.valor)!== typeof("")) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","El valor ingresado no es una string",this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    }
                    return new Literal(this.linea, this.columna, Array.from(valor.valor), tipos.CARACTER);
                default:
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","función inexistente",this.linea, this.columna));
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);

            }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","El valor indicado no existe",this.linea, this.columna));
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }

    getNodo():nodoAST{
        let nodo = new nodoAST("NATIVA");
        nodo.agregarHijo(this.nombre.toUpperCase());
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}