import { Instruccion } from "../Abstract/instruccion";
import { Expresion } from "../expresiones/expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";

export default class RETURN extends Instruccion {
    public exp:Expresion | any;
    constructor(linea:number, columna:number, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        let valor = this.exp.getValor(arbol, tabla);
        if(valor){
            return {nombre:"RETURN", retorno:valor};
        }
        return {nombre:"RETURN", retorno:undefined};
    }

}