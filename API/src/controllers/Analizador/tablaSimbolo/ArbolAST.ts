import Entorno from "./Entorno";
import Excepcion from "../exceptions/Excepcion";
import { Instruccion } from "../Abstract/instruccion";
import ListaSimbolo from "./ListaSimbolos";
import { Expresion } from "../expresiones/expresion";

export default class ArbolAST {
    public instrucciones: Array<Instruccion>;
    public FUNCIONES: Array<Instruccion> = new Array<Instruccion>();
    public errores: Array<Excepcion> = new Array<Excepcion>();
    public consola: String;
    public global: Entorno;
    public num_error:number = 0;
    public pilaCiclo:any[] = [];
    public pilaFuncion:any[] = [];
    public exec: Array<Expresion> = new Array<Expresion>();
    public lista_simbolos:Array<ListaSimbolo> = new Array<ListaSimbolo>();
    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno();
    }

    public updateConsola(update:String){
        this.consola = `${this.consola}${update}\n`;
    }

    public EjecutarBloque() {
        if (this.exec.length>1) {
            this.num_error++;
            this.errores.push(new Excepcion(this.num_error, "SEMANTICO", "Existen 2 exec en la ejecución", -1, -1));
            return;
        }
        for(let elemento of this.FUNCIONES){
            if(typeof(elemento) !== typeof("")){
                elemento.ejecutar(this, this.global);
            }
        }
        if (this.exec.length===1) {
            this.exec[0].getValor(this, this.global);
        }
        for(let elemento of this.instrucciones){
            if(typeof(elemento) !== typeof("")){
                elemento.ejecutar(this, this.global);
            }
        }
    }
}