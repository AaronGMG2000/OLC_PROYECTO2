import Simbolo from "./simbolo";
import Entorno from "./Entorno";
import Excepcion from "../exceptions/Excepcion";
import {node} from "../Abstract/nodo";
import { tipos } from "./tipo";

export default class ArbolAST {
    public instrucciones: Array<node>;
    public errores: Array<Excepcion>;
    public consola: String;
    public global: Entorno;
    constructor(instrucciones: Array<node>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno();
        this.errores = new Array<Excepcion>();
    }

    public updateConsola(update:String){
        this.consola = `${this.consola}${update}\n`;
    }
}