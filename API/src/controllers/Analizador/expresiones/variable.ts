import { nodoAST } from "../Abstract/nodoAST";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";
import Literal from "./literal";

export default class VARIABLE extends Expresion {
    public expre:Literal|any;
    constructor(linea: number, columna: number, nombre:string) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip, nombre);
        this.nombre = nombre;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        let expre = tabla.get(this.nombre);
        if (expre.tipo.tipos !== tipos.ERROR){
            this.expre = expre;
            return expre.valor;
        }
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }
    
    getNodo():nodoAST{
        let nodo = new nodoAST("VARIABLE");
        nodo.agregarHijo(this.nombre);
        return nodo;
    }

}
