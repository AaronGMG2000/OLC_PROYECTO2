import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import Literal from "../expresiones/literal";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class DECLARAR extends Instruccion {
    public exp: Expresion | undefined;
    public ID:string;
    public tipo:Tipo;
    public DIMENSION:Expresion|any;
    public CANTIDAD:Expresion|any;
    constructor(linea:number, columna:number, ID:string, Tipo:Tipo, DIMENSION?:Expresion, CANTIDAD?:Expresion, exp?:Expresion){
        super(linea, columna);
        if(!exp && typeof(DIMENSION)!==typeof(-1)  && typeof(DIMENSION)!==typeof(undefined)){
            this.exp = new Literal(this.linea, this.columna,"vector",Tipo.tipos, true);
        }else if(!exp &&typeof(CANTIDAD)!==typeof(-1) && typeof(CANTIDAD)!==typeof(undefined)){
            this.exp = new Literal(this.linea, this.columna,"vector",Tipo.tipos, true);
        }else{
            this.exp = exp;
        }
        this.ID=ID;
        this.tipo = Tipo;
        if (DIMENSION) {
            this.DIMENSION = DIMENSION;
        }else{
            this.DIMENSION = -1;
        }
        if (CANTIDAD) {
            this.CANTIDAD = CANTIDAD;
        }else{
            this.CANTIDAD = -1;
        }
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        const comprobar = tabla.get(this.ID);
        if(comprobar.tipo.tipos===tipos.ERROR){
            let ex = this.exp?.getValor(arbol, tabla);
            let v1 = -1;
            let v2 = -1;
            if (typeof(this.DIMENSION)!==typeof(-1)) {
                v1 = this.DIMENSION.getValor(arbol, tabla).valor;
            }
            if (typeof(this.CANTIDAD)!==typeof(-1)) {
                v2 = this.DIMENSION.getValor(arbol, tabla).valor;
            }
            if (ex) {
                if (ex.Tipo.tipos===tipos.ERROR) {
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","Fallo al asignar", this.linea, this.columna));
                    return false;
                }
                if (ex.Tipo.tipos!==this.tipo.tipos && this.tipo.tipos!==tipos.DOBLE
                    && this.tipo.tipos !== tipos.ENTERO){
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","los tipos ingresados no coinciden",this.linea, this.columna));
                    return false;
                }
                if ((this.tipo.tipos === tipos.DOBLE || this.tipo.tipos===tipos.ENTERO)
                    && (ex.Tipo.tipos!==tipos.DOBLE && ex.Tipo.tipos !== tipos.ENTERO)) {
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","los tipos ingresados no coinciden",this.linea, this.columna));
                    return false;
                }
            }
            if (!ex) {
                ex = new Literal(this.linea, this.columna, undefined, this.tipo.tipos, true);
            }
            tabla.set(this.ID, ex, this.tipo, v1, v2);
            return true;
        }
        //ERROR
        return false;
    }

}