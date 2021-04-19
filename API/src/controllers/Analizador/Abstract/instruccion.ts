import Tipo from "../tablaSimbolo/tipo";
import Arbol from "../tablaSimbolo/ArbolAST";
import TablaSimbolos from "../tablaSimbolo/Entorno";

export abstract class Instruccion {

    public linea: number;
    public columna: number;

    constructor(linea : number, columna:number) {
        this.linea = linea;
        this.columna = columna;
    }

    abstract ejecutar(arbol: Arbol, tabla: TablaSimbolos):any;
    // TODO graficar AST
}