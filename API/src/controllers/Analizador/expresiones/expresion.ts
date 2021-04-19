import { node } from "../Abstract/nodo";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo from "../tablaSimbolo/tipo";

export abstract class Expresion extends node {

    public Tipo:Tipo;
    public valor:any;
    constructor(linea : number, columna:number, valor:any, tipo:Tipo) {
        super(linea, columna);
        this.Tipo = tipo;
        this.valor = valor;
    }

    abstract getValor(arbol: ArbolAST, tabla: Entorno):Expresion;
    // TODO graficar AST
}