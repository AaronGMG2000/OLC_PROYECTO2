import Excepcion from "../exceptions/Excepcion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";
import Literal from "./literal";
import VARIABLE from "./variable";

export default class DECREMENTO extends Expresion {

    public exp:Expresion;
    constructor(linea: number, columna: number, exp:Expresion) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.exp = exp;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        let comprobar = this.exp.getValor(arbol, tabla);
        if (comprobar.Tipo.tipos!==tipos.ERROR) {
            if (comprobar.Tipo.tipos===tipos.CADENA) {
                return new Literal(this.linea, this.columna, comprobar.valor.toUpperCase(), tipos.CADENA);
            }
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","toUpper solo se puede realizar en un string",this.linea, this.columna));
            return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
        }
        if (this.exp instanceof VARIABLE) {
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","La variable indicada no existe",this.linea, this.columna));
            return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
        }
        return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
    }

}