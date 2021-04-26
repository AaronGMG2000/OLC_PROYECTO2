import { Instruccion } from "../Abstract/instruccion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";

export default class CONTINUE extends Instruccion {
    constructor(linea:number, columna:number){
        super(linea, columna);
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        return {nombre:"CONTINUE", retorno:undefined};
        //ERROR
    }

}