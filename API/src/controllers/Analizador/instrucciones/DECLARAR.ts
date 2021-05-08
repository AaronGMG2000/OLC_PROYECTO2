import { Instruccion } from "../Abstract/instruccion";
import { nodoAST } from "../Abstract/nodoAST";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import Literal from "../expresiones/literal";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import ListaSimbolo from "../tablaSimbolo/ListaSimbolos";
import Simbolo from "../tablaSimbolo/simbolo";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class DECLARAR extends Instruccion {
    public exp: Expresion | any;
    public ID:string;
    public tipo:Tipo;
    public tipo2:Tipo | any;
    public DIMENSION:Expresion|any;
    public CANTIDAD:Expresion|any;
    public lista:any[] = [];
    public v1 = 0;
    public v2 = 0;
    constructor(linea:number, columna:number, ID:string, Tipo:Tipo, DIMENSION?:Expresion, CANTIDAD?:Expresion, exp?:Expresion, tipo2?:Tipo){
        super(linea, columna);
        if(!exp && typeof(DIMENSION)!==typeof(-1)  && typeof(DIMENSION)!==typeof(undefined)){
            this.exp = new Literal(this.linea, this.columna,"vector",Tipo.tipos, true);
        }else if(!exp &&typeof(CANTIDAD)!==typeof(-1) && typeof(CANTIDAD)!==typeof(undefined)){
            this.exp = new Literal(this.linea, this.columna,undefined,Tipo.tipos, true);
        }else{
            this.exp = exp;
        }
        this.ID=ID;
        this.tipo = Tipo;
        this.tipo2 = tipo2;
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
        if (this.tipo2 instanceof Tipo) {
            if (this.tipo2.tipos!==this.tipo.tipos) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","El tipo de declaración no coincide con el de la variable",this.linea, this.columna));
                return false;
            }
        }
        let nueva_variable:any = undefined;
        const comprobar = tabla.getLocal(this.ID);
        if (this.exp instanceof Array && this.DIMENSION) {
            let nueva = [];
            for(let valores of this.exp){
                let value = valores.getValor(arbol, tabla);
                if (value) {
                    if (value.Tipo.tipos!== this.tipo.tipos) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","tipo dentro de valores de la declaración no coincide", value.linea, value.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    }
                    nueva.push(value.valor);
                    this.lista.push(new Literal(this.linea, this.columna, value.valor, this.tipo.tipos));
                }else{
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","fallo al obtener el valor", valores.linea, valores.columna));
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR); 
                }
            }
            this.lista = nueva;
            nueva_variable = new Literal(this.linea, this.columna, nueva, this.tipo.tipos, true);
        }
        if(comprobar.tipo.tipos===tipos.ERROR){
            
            let ex:any = undefined;
            if (nueva_variable) {
                ex = nueva_variable;
            }else{
                ex = this.exp?.getValor(arbol, tabla);
                
            }
            let v1 = -1;
            let v2 = -1;
            if (typeof(this.DIMENSION)!==typeof(-1)) {
                v1 = this.DIMENSION.getValor(arbol, tabla).valor;
                this.v1 = v1;
            }
            if (typeof(this.CANTIDAD)!==typeof(-1)) {
                v2 = this.CANTIDAD.getValor(arbol, tabla).valor;
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
            if (this.DIMENSION!=-1 && v1<0) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","Tamaño de vector invalido",this.linea, this.columna));
                return false;
            }
            if (tabla.nombre.toUpperCase()==="GLOBAL") {
                if (v1!==-1) {
                    arbol.lista_simbolos.push(new ListaSimbolo(arbol.lista_simbolos.length,this.ID, "VECTOR", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));        
                }else if (v2!==-1) {
                    arbol.lista_simbolos.push(new ListaSimbolo(arbol.lista_simbolos.length,this.ID, "LISTA", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));        
                }else{
                    arbol.lista_simbolos.push(new ListaSimbolo(arbol.lista_simbolos.length,this.ID, "VARIABLE", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));        
                }
            }
            this.ast = true;
            if (ex.valor instanceof Array && this.CANTIDAD) {
                v2 = ex.valor.length;        
            }
            tabla.set(this.ID, ex, this.tipo, v1, v2);
            return true;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","La Variable ya esta declarada",this.linea, this.columna));
        return false;
    }

    getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST("DECLARAR");
        if (typeof(this.DIMENSION)!==typeof(-1) && this.exp instanceof Array) {
            nodo.agregarHijo(undefined, undefined,this.tipo.getNodo())
            nodo.agregarHijo("[");
            nodo.agregarHijo("]");
            nodo.agregarHijo(this.ID);
            nodo.agregarHijo("=");
            nodo.agregarHijo("{");
            let nodo2 = new nodoAST("EXPRESIONES")
            for(let element of this.exp){
                nodo2.agregarHijo(undefined, undefined,element.getNodo());
            }
            nodo.agregarHijo(undefined, undefined, nodo2);
            nodo.agregarHijo("}");
            nodo.agregarHijo(";")
        }
        else if (typeof(this.DIMENSION)!==typeof(-1)) {
            nodo.agregarHijo(undefined, undefined,this.tipo.getNodo())
            nodo.agregarHijo("[");
            nodo.agregarHijo("]");
            nodo.agregarHijo(this.ID);
            nodo.agregarHijo("=");
            nodo.agregarHijo("new");
            nodo.agregarHijo(undefined, undefined,this.tipo2.getNodo());
            nodo.agregarHijo("[");
            let g = new Literal(this.linea, this.columna, this.v1, this.tipo.tipos);
            nodo.agregarHijo(undefined,undefined,g.getNodo());
            nodo.agregarHijo("]");
            nodo.agregarHijo(";");
        }
        else if (typeof(this.CANTIDAD)!==typeof(-1)) {
            if (!this.exp) {
                nodo.agregarHijo("LIST");
                nodo.agregarHijo("<");
                nodo.agregarHijo(undefined, undefined,this.tipo.getNodo())
                nodo.agregarHijo(">");
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("=");
                nodo.agregarHijo("new");
                nodo.agregarHijo("LIST");
                nodo.agregarHijo("<");
                nodo.agregarHijo(undefined, undefined,this.tipo2.getNodo());
                nodo.agregarHijo(">");
                nodo.agregarHijo(";");
            }else{
                nodo.agregarHijo("LIST");
                nodo.agregarHijo("<");
                nodo.agregarHijo(undefined, undefined,this.tipo.getNodo())
                nodo.agregarHijo(">");
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined, undefined,this.exp.getNodo());
                nodo.agregarHijo(";");
            }
        }else{
            if (this.exp) {
                nodo.agregarHijo(this.tipo.getTipo());
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined,undefined,this.exp.getNodo());
                nodo.agregarHijo(";");
            }else{
                nodo.agregarHijo(this.tipo.getTipo());
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo(";");
            }
        }
        return nodo;
    }
}