import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import { Expresion } from "./expresion";

export default class Literal extends Expresion {

    constructor(linea: number, columna: number, valor: any, T: tipos) {
        const tip = new Tipo(T);
        switch (tip.tipos) {
            case tipos.ENTERO:
                valor = Number(valor);
                break;
            case tipos.BOOLEANO:
                if (typeof(valor)==typeof("") && valor.toUpperCase() === "FALSE") {
                    valor = false;
                } else if(typeof(valor)==typeof("")) {
                    valor = true;
                }
                break;
            case tipos.DOBLE:
                valor = Number(parseFloat(valor));
                break;
            default:
        }
        super(linea, columna, valor, tip);
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        return this;
    }

}
