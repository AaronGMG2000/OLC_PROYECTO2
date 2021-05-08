import { nodoAST } from "../Abstract/nodoAST";
import Excepcion from "../exceptions/Excepcion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";
import Literal from "./literal";

export default class VECTOR extends Expresion {

    public tip:string;
    constructor(linea: number, columna: number, nombre:string, posicion:Expresion, tipv:string) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip, nombre, posicion);
        this.tip = tipv;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        let expre = tabla.get(this.nombre);
        console.log(expre);
        if (expre.tipo.tipos !== tipos.ERROR){
            if (this.tip ==="VECTOR" && expre.DIMENSION===-1) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Llamada de vector erronea",this.linea, this.columna));
                return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
            }else if(this.tip==="LIST" && expre.CANTIDAD===-1){
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Llamada de lista erronea",this.linea, this.columna));
                return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
            }
            const pos = this.posicion.getValor(arbol, tabla);
            if ((pos.valor < expre.DIMENSION && pos.valor>=0) || (pos.valor<expre.CANTIDAD && pos.valor>=0)) {
                let value = expre.valor.valor[pos.valor];
                return new Literal(this.linea, this.columna, value, expre.tipo.tipos);
            }
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Posición fuera del rango",this.linea, this.columna));
            return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
        }
        if (this.tip ==="VECTOR") {
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","El vector indicado no existe",this.linea, this.columna));
            return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
        }else{
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","La lista indicada no existe",this.linea, this.columna));
            return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
        }
        
    }
    getNodo():nodoAST{
        let nodo = new nodoAST("");
        if (this.tip==="LIST") {
            nodo = new nodoAST("LISTA");
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("[");
            nodo.agregarHijo("[");
            nodo.agregarHijo(undefined, undefined, this.posicion.getNodo());
            nodo.agregarHijo("]");
            nodo.agregarHijo("]");

        }else{
            nodo = new nodoAST("VECTOR");
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("[");
            nodo.agregarHijo(undefined, undefined, this.posicion.getNodo());
            nodo.agregarHijo("]");
        }
        return nodo;
    }

}
