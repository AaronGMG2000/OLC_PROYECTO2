import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "../expresiones/expresion";
import Simbolo from "../tablaSimbolo/simbolo";
import { nodoAST } from "../Abstract/nodoAST";

export default class identificador extends Expresion {
    public ID: String;
    constructor(linea:number, columna:number, valor:any, Tipo:Tipo, ID:String){
        super(linea,columna,valor,Tipo);
        this.ID = ID;

    }
    getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
       var simb:Simbolo = tabla.get(this.ID);
       this.valor = simb.valor;
       this.Tipo = simb.tipo;
       return this;
    }

    getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST("IDENTIFICADOR");
        return nodo;
    }

}