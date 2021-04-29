import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import DECLARAR from "../instrucciones/DECLARAR";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class ADD extends Instruccion {
    
    public ID:string;
    public exp:Expresion;
    
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

}