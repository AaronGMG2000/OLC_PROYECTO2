import { Instruccion } from "../Abstract/instruccion";
import { nodoAST } from "../Abstract/nodoAST";
import { Expresion } from "../expresiones/expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class LLAMADA extends Instruccion {
    public exp: Expresion | any;
    constructor(linea:number, columna:number, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        if (this.exp) {
            return this.exp.getValor(arbol, tabla);
        }
        //ERROR
    }
    getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST("");
        console.log(this.exp);
        nodo = this.exp.getNodo();
        nodo.agregarHijo(";");
        return nodo;
    }

}