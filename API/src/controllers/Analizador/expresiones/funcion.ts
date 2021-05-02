import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "./expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";
import Literal from "./literal";
import RETURN from "../instrucciones/return";
import ListaSimbolo from "../tablaSimbolo/ListaSimbolos";
import FUNCIONF from "../instrucciones/funcion";
import { nodoAST } from "../Abstract/nodoAST";
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
        let nombre_nuevo2 = this.nombre+"#";
        if (this.parametros) {
            for(let par of this.parametros){
                let varr = par.getValor(arbol, tabla);
                nombre_nuevo+=""+varr.Tipo.tipos;
                if (varr.Tipo.tipos===tipos.ENTERO) {
                    nombre_nuevo2+=""+tipos.DOBLE;
                }else{
                    nombre_nuevo2+=""+varr.Tipo.tipos;
                }
            }
        }
        var comprobar = arbol.global.get(nombre_nuevo);
        var comprobar2 = arbol.global.get(nombre_nuevo2);
        if(comprobar.tipo.tipos !== tipos.ERROR || comprobar2.tipo.tipos!==tipos.ERROR){
            let func:any = undefined;
            if (comprobar.tipo.tipos!==tipos.ERROR) {
                func = comprobar.valor;
            }else{
                func = comprobar2.valor;
            }
            if (func.PARAMETRO) {
                let x = 0;
                for(let declaracion of func.PARAMETRO){
                    let yy = this.parametros[x].getValor(arbol, tabla)
                    yy.linea = declaracion.linea;
                    yy.columna =declaracion.columna;
                    declaracion.exp = yy;
                    declaracion.ejecutar(arbol, Nuevo_Entorno);
                    x++; 
                }
            }
            arbol.pilaFuncion.push("funcion");
            for(let element of func.INSTRUCCION){
                if(typeof(element) !== typeof("")){
                    let res = element.ejecutar(arbol, Nuevo_Entorno);
                    if (typeof(res)===typeof([])) {
                        if (res.nombre==="RETURN") {
                            if(arbol.pilaFuncion.length>0){
                                let retorno = res.retorno;
                                if (retorno) {
                                    if (func.tipo.tipos===retorno.Tipo.tipos ||
                                        (func.tipo.tipos===tipos.ENTERO && retorno.Tipo.tipos===tipos.DOBLE
                                        || func.tipo.tipos===tipos.DOBLE && retorno.Tipo.tipos===tipos.ENTERO)) {
                                        
                                            let rest = retorno.getValor(tabla, Nuevo_Entorno);
                                            if(rest.Tipo.tipos===tipos.ERROR){
                                                arbol.num_error++;
                                                arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTIO", "Error en valor de retorno",this.linea, this.columna));
                                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                            }
                                            rest.nombre = "FUNCION";
                                            return rest;
                                    }
                                }
                                return new Literal(this.linea, this.columna, undefined, tipos.CADENA);

                            }else{
                                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                
                            } 
                        }
                        if (res.nombre==="BREAK") {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTIO", "No se puede utilizar break dentro de una función",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);   
                        }
                        if (res.nombre==="CONTINUE") {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTIO", "No se puede utilizar continue dentro de una función",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR); 
                            
                        }
                    }
                }
            }
            if (!func.registrada) {
                for(let sim of Nuevo_Entorno.tabla){
                    let valor = sim[1];
                    if (valor.CANTIDAD!==-1) {
                        arbol.lista_simbolos.push(new ListaSimbolo(arbol.lista_simbolos.length,valor.getIdentificador(), "LISTA", valor.tipo.getTipo(), valor.valor.linea, valor.valor.columna, Nuevo_Entorno.nombre)); 
                    }else if(valor.DIMENSION!==-1){
                        arbol.lista_simbolos.push(new ListaSimbolo(arbol.lista_simbolos.length,valor.getIdentificador(), "VECTOR", valor.tipo.getTipo(), valor.valor.linea, valor.valor.columna, Nuevo_Entorno.nombre)); 
                    }else{
                        if (valor.valor instanceof FUNCIONF) {
                            arbol.lista_simbolos.push(new ListaSimbolo(arbol.lista_simbolos.length,valor.getIdentificador(), "FUNCION", valor.tipo.getTipo(), valor.valor.linea, valor.valor.columna, Nuevo_Entorno.nombre)); 
                        }
                        arbol.lista_simbolos.push(new ListaSimbolo(arbol.lista_simbolos.length,valor.getIdentificador(), "VARIABLE", valor.tipo.getTipo(), valor.valor.linea, valor.valor.columna, Nuevo_Entorno.nombre)); 

                    }
                }
            }
            if (!func.vector) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba return",this.linea, this.columna));
                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
            }
            if(func.vector){
                return new Literal(this.linea, this.columna, undefined, tipos.CADENA, true);
            }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","No se encontro la función",this.linea, this.columna));
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }

    getNodo():nodoAST{
        let nodo = new nodoAST("LLAMADA");
        nodo.agregarHijo(this.nombre);
        nodo.agregarHijo("(");
        if (this.parametros) {
            let nodo2 = new nodoAST("PARAMETROS");
            for(let element of this.parametros){
                if (typeof(this.parametros)!==typeof("")) {
                    nodo2.agregarHijo(undefined, undefined, element.getNodo());
                }
            }
            nodo.agregarHijo(undefined, undefined, nodo2);
        }
        nodo.agregarHijo(")");
        return nodo;
    }
}