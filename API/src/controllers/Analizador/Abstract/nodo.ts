import ArbolAST from '../tablaSimbolo/ArbolAST';
import Entorno from '../tablaSimbolo/Entorno';
export abstract class node {

    public linea: number;
    public columna: number;

    constructor(linea : number, columna:number) {
        this.linea = linea;
        this.columna = columna;
    }
    // TODO graficar AST
}