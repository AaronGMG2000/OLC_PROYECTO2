import Tipo from "../tablaSimbolo/tipo";
import Arbol from "../tablaSimbolo/ArbolAST";
import TablaSimbolos from "../tablaSimbolo/Entorno";
import { nodoAST } from "./nodoAST";

export abstract class Instruccion {

    public linea: number;
    public columna: number;
    public ast:boolean=false;
    constructor(linea : number, columna:number) {
        this.linea = linea;
        this.columna = columna;
    }

    abstract ejecutar(arbol: Arbol, tabla: TablaSimbolos):any;
    public abstract getNodo():nodoAST;
    // TODO graficar AST
}