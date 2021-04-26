import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class ASIGNAR extends Instruccion {
    public exp: Expresion | undefined;
    public ID:string;
    public UBICACION:number;
    constructor(linea:number, columna:number, ID:string,UBICACION:number=-1, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
        this.ID=ID;
        this.UBICACION = UBICACION;
    }

    

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        const expre = tabla.get(this.ID);
        if(expre){
            let value = this.exp?.getValor(arbol, tabla);
            if (expre.tipo.tipos!==value?.Tipo.tipos) {
                arbol.errores.push(new Excepcion("Semantico","el tipado de la variable no coincide con el del valor indicado", this.linea, this.columna));
                return;
            }
            const comprobar = tabla.update(this.ID, value, this.UBICACION);
            if (!comprobar){
                arbol.errores.push(new Excepcion("Semantico","No se encontro la variable "+this.ID, this.linea, this.columna));
                return;
            }
        }
        return;
        //ERROR
    }

}