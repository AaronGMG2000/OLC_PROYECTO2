import { node } from "../Abstract/nodo";
import { nodoAST } from "../Abstract/nodoAST";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo from "../tablaSimbolo/tipo";

export abstract class Expresion extends node {

    public Tipo:Tipo;
    public valor:any;
    public nombre:string|any;
    public posicion:Expresion|any;
    constructor(linea : number, columna:number, valor:any, tipo:Tipo, nombre?:string, Posicion?:Expresion) {
        super(linea, columna);
        this.Tipo = tipo;
        this.valor = valor;
        this.nombre = nombre;
        if (Posicion) {
            this.posicion = Posicion;
        }else{
            this.posicion = -1;
        }
    }

    abstract getValor(arbol: ArbolAST, tabla: Entorno):any;
    public abstract getNodo():nodoAST;
    // TODO graficar AST
}
