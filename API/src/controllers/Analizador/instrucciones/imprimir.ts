import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
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
            if (result) {
                if (result.Tipo.tipos!=tipos.ERROR) {
                    if (result.valor instanceof Array) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede imprimir una lista o vector",this.linea, this.columna));   
                        return;
                    }
                    if (arbol.consola==="") {
                        arbol.consola+=result.valor;
                    }else{
                        arbol.consola+="\n"+result.valor;
                    }
                }
            }
        }
    }
}