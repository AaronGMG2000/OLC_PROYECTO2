import { Instruccion } from "../Abstract/instruccion";
import { Expresion } from "../expresiones/expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class DECLARAR extends Instruccion {
    public exp: Expresion | undefined;
    public ID:string;
    public tipo:Tipo;
    public DIMENSION:number;
    public CANTIDAD:number;
    constructor(linea:number, columna:number, ID:string, Tipo:Tipo, DIMENSION:number=-1, CANTIDAD:number=-1, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
        this.ID=ID;
        this.tipo = Tipo;
        this.DIMENSION = DIMENSION;
        this.CANTIDAD = CANTIDAD;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        const comprobar = tabla.get(this.ID);
        if(comprobar.tipo.tipos!==tipos.ERROR){
            tabla.set(this.ID, this.exp, this.tipo, this.DIMENSION, this.CANTIDAD);
            return;
        }
        //ERROR
    }

}