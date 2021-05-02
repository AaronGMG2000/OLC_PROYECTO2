import { Instruccion } from "../Abstract/instruccion";
import { nodoAST } from "../Abstract/nodoAST";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import Literal from "../expresiones/literal";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class SWITCH extends Instruccion {
    public Variable: Expresion;
    public Case: any[] | any;
    public Default: Array<Instruccion> | any;
    
    constructor(linea:number, columna:number, Variable:Expresion, Case?:any[], Default?:Array<Instruccion>){
        super(linea, columna);
        this.Variable = Variable;
        this.Case = Case;
        this.Default = Default;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        
        let variable = this.Variable.getValor(arbol, tabla);
        if(variable.Tipo.tipos !== tipos.ERROR){
            let Nuevo_Entorno = new Entorno("IF",tabla);
            arbol.pilaCiclo.push("SWITCH");
            if (this.Case) {
                let correcto = false;
                for(let caso of this.Case){
                    if (typeof(caso)!==typeof("")) {
                        let val = caso.Case.getValor();
                        if (val.Tipo.tipos!== tipos.ERROR) {
                            if (variable.Tipo.tipos === val.Tipo.tipos ||
                                variable.Tipo.tipos === tipos.ENTERO && val.Tipo.tipos===tipos.DOBLE ||
                                (variable.Tipo.tipos === tipos.DOBLE && val.Tipo.tipos===tipos.ENTERO)) {
                                    if (val.valor === variable.valor || correcto) {
                                        correcto = true;
                                        for(let elemento of caso.INS){
                                            if(typeof(elemento) !== typeof("")){
                                                let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                                                if(typeof(res) === typeof([])){
                                                    if (res.nombre==="RETURN") {
                                                        if(arbol.pilaFuncion.length>0){
                                                            arbol.pilaCiclo.pop();
                                                            return res;
                                                        }else{
                                                            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                                        } 
                                                    }else if(res.nombre==="BREAK"){
                                                        if(arbol.pilaCiclo.length>0){
                                                            arbol.pilaCiclo.pop();
                                                            return;
                                                        }else{
                                                            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                                                        }
                                                    }else if(res.nombre==="CONTINUE"){
                                                        if(arbol.pilaCiclo.length>1){
                                                            arbol.pilaCiclo.pop();
                                                            return res;
                                                        }else{
                                                        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                                        }
                                                    }
                                                    return;
                                                }    
                                            }
                                        }
                                    }
                            }else{
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Constante de Case incorrecta",this.linea, this.columna));
                                break;
                            }
                        }else{
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Constante de Case incorrecta",this.linea, this.columna));
                            break;
                        }
                    }
                }
            }

            if (this.Default) {
                for(let elemento of this.Default){
                    if(typeof(elemento) !== typeof("")){
                        let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                        if(typeof(res) === typeof([])){
                            if (res.nombre==="RETURN") {
                                if(arbol.pilaFuncion.length>0){
                                    arbol.pilaCiclo.pop();
                                    return res;
                                }else{
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                } 
                            }else if(res.nombre==="BREAK"){
                                if(arbol.pilaCiclo.length>0){
                                    arbol.pilaCiclo.pop();
                                    return;
                                }else{
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }else if(res.nombre==="CONTINUE"){
                                if(arbol.pilaCiclo.length>1){
                                    arbol.pilaCiclo.pop();
                                    return res;
                                }else{
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            return;
                        }    
                    }
                }
            }

            arbol.pilaCiclo.pop();
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","error al leer la variable condicional", this.linea, this.columna));
        return;
    }
    getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST("SWITCH");
        nodo.agregarHijo("SWITCH");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.Variable.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        let cas = new nodoAST("CASOS");
        let raiz = cas;
        let x = 0;
        if (this.Case) {
            for(let caso of this.Case){
                if (typeof(caso)!==typeof("")) {
                    cas.agregarHijo("CASE");
                    cas.agregarHijo(undefined, undefined, caso.Case.getNodo());
                    cas.agregarHijo(":")
                    if (caso.INS) {
                        let inst = new nodoAST("INSTRUCCIONES");
                        for(let instruccion of caso.INS){
                            if (typeof(instruccion)!==typeof("")) {
                                inst.agregarHijo(undefined, undefined, instruccion.getNodo());
                            }
                        }
                        cas.agregarHijo(undefined, undefined, inst);
                    }
                    x++;
                    if (x!==this.Case.length) {
                        let case2 = new nodoAST("CASOS");
                        cas.agregarHijo(undefined, undefined, case2);
                        cas = case2;
                    }
                }
            }
        }
        if (this.Default) {
            let def = new nodoAST("DEFAULT");
            for(let elemento of this.Default){
                if(typeof(elemento) !== typeof("")){
                    def.agregarHijo(undefined, undefined, elemento.getNodo());
                }
            }
            if (x==0) {
                cas = new nodoAST("DEFAULT");
            }else{
                cas.agregarHijo(undefined,undefined,def);
            }
        }
        if (this.Case || this.Default) {
            nodo.agregarHijo(undefined, undefined, raiz);
        }
        nodo.agregarHijo("}");
        return nodo;
    }
}