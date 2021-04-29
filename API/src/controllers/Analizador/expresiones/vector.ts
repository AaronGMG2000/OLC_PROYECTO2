import Excepcion from "../exceptions/Excepcion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";
import Literal from "./literal";

export default class VECTOR extends Expresion {

    constructor(linea: number, columna: number, nombre:string, posicion:Expresion) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip, nombre, posicion);
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        let expre = tabla.get(this.nombre);
        if (expre.tipo.tipos !== tipos.ERROR){
            const pos = this.posicion.getValor(arbol, tabla);
            if ((pos.valor < expre.DIMENSION && pos.valor>=0) || (pos.valor<expre.CANTIDAD && pos.valor>=0)) {
                let value = expre.valor.valor[pos.valor];
                return new Literal(this.linea, this.columna, value, expre.tipo.tipos);
            }
            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Posición fuera del rango",this.linea, this.columna));
            return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
        }
        return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
    }

}
