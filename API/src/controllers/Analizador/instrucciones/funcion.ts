import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import DECLARAR from "../instrucciones/DECLARAR";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import ListaSimbolo from "../tablaSimbolo/ListaSimbolos";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class FUNCIONF extends Instruccion {
    
    public tipo:Tipo;
    public nombre:string;
    public PARAMETRO: Array<DECLARAR> | any;
    public INSTRUCCION: Array<Instruccion>;
    public vector:boolean;
    public registrada:boolean = false;
    public reg = false;
    constructor(linea:number, columna:number, tipo:Tipo, nombre:string, INS:Array<Instruccion>, Parametro?:Array<DECLARAR>, vector:boolean=false){
        super(linea, columna);
        this.tipo = tipo;
        this.nombre = nombre;
        this.INSTRUCCION = INS;
        this.PARAMETRO = Parametro;
        this.vector = vector;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        
        let up = this.nombre.toUpperCase();
        if (up==="LENGTH" || up==="TRUNCATE" || up==="ROUND" 
            || up==="TYPEOF" || up==="TOSTRING" || up==="TOCHARARRAY") {
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Existe una función nativa con este nombre", this.linea, this.columna));
            return;
        }
        this.nombre+="#";
        if (this.PARAMETRO) {
            for(let par of this.PARAMETRO){
                this.nombre+=""+par.tipo.tipos;
            }
        }
        var comprobar = tabla.get(this.nombre);
        if (comprobar.tipo.tipos===tipos.ERROR) {
            if (!this.reg) {
                if (this.vector) {
                    arbol.lista_simbolos.push(new ListaSimbolo(arbol.lista_simbolos.length,this.nombre, "METODO", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));        
                }else{
                    arbol.lista_simbolos.push(new ListaSimbolo(arbol.lista_simbolos.length,this.nombre, "FUNCION", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));        
                }
                this.reg = true;
            }
            tabla.set(this.nombre, this, this.tipo, -1, -1);
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Ya existe una función con el nombre indicado", this.linea, this.columna));
        return;
        // ERROR
    }

}