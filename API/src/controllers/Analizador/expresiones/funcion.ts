import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "./expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import Literal from "./literal";

export default class FUNCION extends Expresion {

    public nombre:string;
    public parametros:Array<Expresion> | any;
    constructor(linea: number, columna: number, nombre:string, parametros?:Array<Expresion>) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.nombre = nombre;
        this.parametros = parametros;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        this.nombre+="#";
        if (this.parametros) {
            for(let par of this.parametros){
                this.nombre+=""+par.Tipo.tipos;
            }
        }
        var comprobar = tabla.get(this.nombre);
        if(comprobar){
            console.log(comprobar);
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba un valor numerico",this.linea, this.columna));
        return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
    }

}