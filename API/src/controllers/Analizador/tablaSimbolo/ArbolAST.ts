import Entorno from "./Entorno";
import Excepcion from "../exceptions/Excepcion";
import { Instruccion } from "../Abstract/instruccion";

export default class ArbolAST {
    public instrucciones: Array<Instruccion>;
    public FUNCIONES: Array<Instruccion> = new Array<Instruccion>();
    public errores: Array<Excepcion> = new Array<Excepcion>();
    public consola: String;
    public global: Entorno;
    public num_error:number = 0;
    public pilaCiclo:any[] = [];
    public pilaFuncion:any[] = [];
    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno();
    }

    public updateConsola(update:String){
        this.consola = `${this.consola}${update}\n`;
    }

    public EjecutarBloque() {
        for(let elemento of this.FUNCIONES){
            if(typeof(elemento) !== typeof("")){
                elemento.ejecutar(this, this.global);
            }
        }
        for(let elemento of this.instrucciones){
            if(typeof(elemento) !== typeof("")){
                elemento.ejecutar(this, this.global);
            }
        }
        console.log(this.errores);
    }
}