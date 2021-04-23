import Entorno from "./Entorno";
import Excepcion from "../exceptions/Excepcion";
import { Instruccion } from "../Abstract/instruccion";

export default class ArbolAST {
    public instrucciones: Array<Instruccion>;
    public errores: Array<Excepcion> = new Array<Excepcion>();
    public consola: String;
    public global: Entorno;
    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno();
    }

    public updateConsola(update:String){
        this.consola = `${this.consola}${update}\n`;
    }

    public EjecutarBloque() {
        for(let elemento of this.instrucciones){
            elemento.ejecutar(this, this.global);
        }
    }
}