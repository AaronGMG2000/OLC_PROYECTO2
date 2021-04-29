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
        let Nuevo_Entorno = new Entorno(this.nombre,arbol.global);
        let nombre_nuevo = this.nombre+"#";
        if (this.parametros) {
            for(let par of this.parametros){
                let varr = par.getValor(arbol, tabla);
                nombre_nuevo+=""+varr.Tipo.tipos;
            }
        }
        var comprobar = arbol.global.get(nombre_nuevo);
        if(comprobar.tipo.tipos !== tipos.ERROR){
            let func = comprobar.valor;
            if (func.PARAMETRO) {
                let x = 0;
                for(let declaracion of func.PARAMETRO){
                    declaracion.exp = this.parametros[x].getValor(arbol, tabla);
                    declaracion.ejecutar(arbol, Nuevo_Entorno);
                    x++; 
                }
            }
            arbol.pilaFuncion.push("funcion");
            for(let element of func.INSTRUCCION){
                let res = element.ejecutar(arbol, Nuevo_Entorno);
                if (typeof(res)===typeof([])) {
                    if (res.nombre==="RETURN") {
                        if(arbol.pilaFuncion.length>0){
                            let retorno = res.retorno;
                            if (func.tipo.tipos===retorno.Tipo.tipos && !func.vector) {
                                let rest = retorno.getValor(tabla, Nuevo_Entorno);
                                if(rest.Tipo.tipos===tipos.ERROR){
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTIO", "Error en valor de retorno",this.linea, this.columna));
                                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                }
                                rest.nombre = "FUNCION";
                                return rest;
                            }else if(func.vector){
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","Función void no puede tener valor de retorno", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            }
                        }else{
                            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            
                        } 
                    }
                }
            }
            if(func.vector){
                return new Literal(this.linea, this.columna, undefined, tipos.CADENA, true);
            }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba un valor numerico",this.linea, this.columna));
        return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
    }

}