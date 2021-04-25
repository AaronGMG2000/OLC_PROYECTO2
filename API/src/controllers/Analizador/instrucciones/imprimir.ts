import { Instruccion } from "../Abstract/instruccion";
import { Expresion } from "../expresiones/expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class Imprimir extends Instruccion {
    public exp: Expresion | any;
    constructor(linea:number, columna:number, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        if (this.exp) {
            var result = this.exp.getValor(arbol, tabla);
            if (result.Tipo.tipos!=tipos.ERROR) {
                if (arbol.consola==="") {
                    arbol.consola+=result.valor;
                }else{
                    arbol.consola+="\n"+result.valor;
                }
            }
        }
        //ERROR
    }

}