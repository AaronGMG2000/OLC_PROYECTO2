import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class DECLARAR extends Instruccion {
    public exp: Expresion | undefined;
    public ID:string;
    public UBICACION:number;
    constructor(linea:number, columna:number, ID:string,UBICACION:number=-1, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
        this.ID=ID;
        this.UBICACION = UBICACION;
    }

    

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        const comprobar = tabla.update(this.ID, this.exp, this.UBICACION);

        if (!comprobar){
            arbol.errores.push(new Excepcion("Semantico","No se encontro la variable "+this.ID, this.linea, this.columna));
        }
        //ERROR
    }

}