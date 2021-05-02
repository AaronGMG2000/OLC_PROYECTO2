import { Instruccion } from "../Abstract/instruccion";
import { nodoAST } from "../Abstract/nodoAST";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import DECLARAR from "../instrucciones/DECLARAR";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Simbolo from "../tablaSimbolo/simbolo";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class ADD extends Instruccion {
    
    public ID:string;
    public exp:Expresion;
    public ast:boolean=false;
    constructor(linea:number, columna:number, ID:string, exp:Expresion){
        super(linea, columna);
        this.ID = ID;
        this.exp = exp;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        var comprobar = tabla.get(this.ID);
        if (comprobar.tipo.tipos!==tipos.ERROR) {
            let valor = this.exp.getValor(arbol, tabla);
            if (valor.Tipo.tipos===tipos.ERROR) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Error al obtener expresión de asignación", this.linea, this.columna));
                return;
            }
            if (valor.Tipo.tipos !== comprobar.tipo.tipos) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "El tipo de la lista y la expresión no coinciden", this.linea, this.columna));
                return;
            }
            this.ast = true;
            comprobar.valor.valor.push(valor.valor);
            comprobar.CANTIDAD++;
            tabla.update(this.ID, comprobar);
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "no existe la lista indicada", this.linea, this.columna));
        return;
        // ERROR
    }

    getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST("ADD");
        let nodo2:nodoAST = new nodoAST("ID");
        nodo2.agregarHijo(this.ID);
        nodo.agregarHijo(undefined, undefined, nodo2);
        nodo.agregarHijo("add");
        nodo.agregarHijo(".");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined,undefined,this.exp.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}