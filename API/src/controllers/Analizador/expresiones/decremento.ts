import Excepcion from "../exceptions/Excepcion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";
import Literal from "./literal";

export default class DECREMENTO extends Expresion {

    public exp:Expresion;
    constructor(linea: number, columna: number, exp:Expresion) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.exp = exp;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        let val = this.exp.getValor(arbol, tabla);
        if (val.Tipo.tipos === tipos.DOBLE || val.Tipo.tipos === tipos.ENTERO) {
            if(this.exp.nombre!=="" && this.exp.nombre!==undefined){
                let expre = tabla.get(this.exp.nombre);
                if (expre.tipo.tipos !== tipos.ERROR && (expre.tipo.tipos===tipos.DOBLE || expre.tipo.tipos===tipos.ENTERO)){
                    
                    if (this.exp.posicion===-1) {
                        let v = expre.valor.getValor(arbol, tabla);
                        console.log(v.valor);
                        var v2 = new Literal(this.linea, this.columna, v.valor-1, expre.valor.Tipo.tipos);
                        tabla.update(this.exp.nombre, v2);
                        return new Literal(this.linea, this.columna, expre.valor.valor, expre.tipo.tipos);
                    }else{
                        let value = expre.valor[this.exp.posicion.valor];
                        let v = new Literal(this.linea, this.columna, value-1, expre.tipo.tipos);
                        let dir = new Literal(this.linea, this.columna, this.exp.posicion.valor, tipos.ENTERO);
                        tabla.update(this.exp.nombre, v, dir);
                        return new Literal(this.linea, this.columna, value-1, expre.tipo.tipos);
                    }
                }
            }else{
                let expre = this.exp.getValor(arbol, tabla);
                expre.valor+=1;
                return new Literal(this.linea, this.columna, expre.valor, expre.Tipo.tipos);
            }
        }
        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba un valor numerico",this.linea, this.columna));
        return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
    }

}