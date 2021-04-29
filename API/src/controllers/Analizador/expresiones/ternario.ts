import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class IF extends Instruccion {
    public condicion1: Expresion;
    public bloque1: Array<Instruccion>;
    public bloque2: Array<Instruccion> | any;
    public elseIf: Instruccion | any;
    
    constructor(linea:number, columna:number, condicion1:Expresion, bloque1: Array<Instruccion>, bloque2?:Array<Instruccion>, elseif?:Instruccion){
        super(linea, columna);
        this.condicion1 = condicion1;
        this.bloque1 = bloque1;
        this.bloque2 = bloque2;
        this.elseIf = elseif;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        let condicion = this.condicion1.getValor(arbol, tabla);
        if(condicion.Tipo.tipos === tipos.BOOLEANO){
            if(condicion.valor){
                let Nuevo_Entorno = new Entorno("IF",tabla);
                for(let elemento of this.bloque1){
                    if(typeof(elemento) !== typeof("")){
                        let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                        if(typeof(res) === typeof([])){
                            if (res.nombre==="RETURN") {
                                if(arbol.pilaFuncion.length>0){
                                    return res;
                                }else{
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                } 
                            }else if(res.nombre==="BREAK"){
                                if(arbol.pilaCiclo.length>0){
                                    return res;
                                }else{
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }else if(res.nombre==="CONTINUE"){
                                if(arbol.pilaCiclo.length>0){
                                    return res;
                                }else{
                                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            return;
                        }
                    }else{
                        console.log(arbol.errores);
                    }
                }
            }
            else if (this.elseIf) {
                let res = this.elseIf.ejecutar(arbol, tabla);
                if(typeof(res) === typeof([])){
                    return res;
                }
                
            }else if(this.bloque2){
                let Nuevo_Entorno = new Entorno("ELSE",tabla);
                for(let elemento of this.bloque2){
                    if(typeof(elemento) !== typeof("")){
                        let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                        if(typeof(res) === typeof([])){
                            if (res.nombre==="RETURN") {
                                if(arbol.pilaFuncion.length>0){
                                    return res;
                                }else{
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                } 
                            }else if(res.nombre==="BREAK"){
                                if(arbol.pilaCiclo.length>0){
                                    return res;
                                }else{
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }else if(res.nombre==="CONTINUE"){
                                if(arbol.pilaCiclo.length>0){
                                    return res;
                                }else{
                                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            return;
                        }
                    }else{
                        console.log(arbol.errores);
                    }
                }
            }
        }
        //ERROR
    }

}