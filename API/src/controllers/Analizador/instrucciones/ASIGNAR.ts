import { Instruccion } from "../Abstract/instruccion";
import { nodoAST } from "../Abstract/nodoAST";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import Literal from "../expresiones/literal";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Simbolo from "../tablaSimbolo/simbolo";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class ASIGNAR extends Instruccion {
    public exp: Expresion | undefined;
    public ID:string;
    public UBICACION: any;
    public tip:string;
    public ubic: Literal|any;
    constructor(linea:number, columna:number, ID:string,UBICACION?:any, exp?:Expresion, tipv:string=""){
        super(linea, columna);
        this.exp = exp;
        this.ID=ID;
        if (UBICACION) {
            this.UBICACION = UBICACION;
        }else{
            this.UBICACION = -1;
        }
        this.tip = tipv;
    }

    

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        const expre = tabla.get(this.ID);
        let ubic = -1;
        if(this.UBICACION!=-1){
            ubic = this.UBICACION.getValor(arbol, tabla);
        }
        if(expre.tipo.tipos!== tipos.ERROR){
            let value = this.exp?.getValor(arbol, tabla);

            if (this.tip ==="VECTOR" && expre.DIMENSION===-1) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Llamada de vector erronea",this.linea, this.columna));
                return false;
            }else if(this.tip==="LIST" && expre.CANTIDAD===-1){
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Llamada de lista erronea",this.linea, this.columna));
                return false;
            }
            
                if (expre.tipo.tipos!==value?.Tipo.tipos && expre.tipo.tipos!==tipos.ENTERO
                    && expre.tipo.tipos!==tipos.DOBLE && value?.Tipo.tipos!== tipos.ENTERO
                    && value?.Tipo.tipos!==tipos.DOBLE) {
                arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","el tipado de la variable no coincide con el del valor indicado", this.linea, this.columna));
                return false;
            }
            this.ast = true;
            const comprobar = tabla.update(this.ID, value, ubic);
            if (!comprobar){
                arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","No se encontro la variable "+this.ID, this.linea, this.columna));
                return false;
            }
            this.ubic = ubic;
            return true;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","Variable no declarada",this.linea, this.columna));
        return false;
        //ERROR
    }

    getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST("ASIGNAR");
        if (this.UBICACION!==-1) {
            if (this.tip==="LIST") {
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("[");
                nodo.agregarHijo("[");
                nodo.agregarHijo(this.ubic.getNodo());
                nodo.agregarHijo("]");
                nodo.agregarHijo("]");
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined, undefined, this.exp?.getNodo());
            }else{
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("[");
                nodo.agregarHijo(this.ubic.getNodo());
                nodo.agregarHijo("]");
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined, undefined, this.exp?.getNodo());
            }
        }else{
            nodo.agregarHijo(this.ID);
            nodo.agregarHijo("=")
            nodo.agregarHijo(undefined, undefined, this.exp?.getNodo());
        }
        return nodo;
    }
}