import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import DECLARAR from "../instrucciones/DECLARAR";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class FUNCION extends Instruccion {
    
    public tipo:Tipo;
    public nombre:string;
    public PARAMETRO: Array<DECLARAR> | any;
    public INSTRUCCION: Array<Instruccion>;
    public vector:boolean;
    
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
            tabla.set(this.nombre, this, this.tipo, -1, -1);
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Ya existe una función con el nombre indicado", this.linea, this.columna));
        return;
        // ERROR
    }

}