import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";

export default class Literal extends Expresion {
    
    constructor(linea:number, columna:number, valor:any, Tipo:Tipo){
        super(linea,columna,valor,Tipo);
    }
    getValor(arbol: ArbolAST, tabla: Entorno):Expresion {
        return this;
    }
}
