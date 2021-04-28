import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class ASIGNAR extends Instruccion {
    public exp: Expresion | undefined;
    public ID:string;
    public UBICACION: any;
    constructor(linea:number, columna:number, ID:string,UBICACION?:any, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
        this.ID=ID;
        if (UBICACION) {
            this.UBICACION = UBICACION;
        }else{
            this.UBICACION = -1;
        }
    }

    

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        const expre = tabla.get(this.ID);
        let ubic = -1;
        if(this.UBICACION!=-1){
            ubic = this.UBICACION.getValor(arbol, tabla);
        }
        if(expre.tipo.tipos!== tipos.ERROR){
            let value = this.exp?.getValor(arbol, tabla);
            if (expre.tipo.tipos!==value?.Tipo.tipos) {
                arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","el tipado de la variable no coincide con el del valor indicado", this.linea, this.columna));
                return false;
            }
            const comprobar = tabla.update(this.ID, value, ubic);
            if (!comprobar){
                arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","No se encontro la variable "+this.ID, this.linea, this.columna));
                return false;
            }
            return true;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","Variable no declarada",this.linea, this.columna));
        return false;
        //ERROR
    }

}