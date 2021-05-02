import { Instruccion } from "../Abstract/instruccion";
import { nodoAST } from "../Abstract/nodoAST";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import Literal from "../expresiones/literal";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class FOR extends Instruccion {
    public declaracion:Instruccion;
    public condicion: Expresion;
    public actualizacion:Instruccion;
    public bloque1: Array<Instruccion>;
    public tipo:string="";
    constructor(linea:number, columna:number, declaracion:Instruccion,condicion:Expresion, actualizacion:Instruccion, bloque1: Array<Instruccion>, tipo:string){
        super(linea, columna);
        this.condicion = condicion;
        this.bloque1 = bloque1;
        this.actualizacion = actualizacion;
        this.declaracion = declaracion;
        this.tipo = tipo;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        let Nuevo_Entorno = new Entorno("FOR",tabla);
        let dec: any = undefined;
        if (this.tipo ==="DEC") {
            dec = this.declaracion.ejecutar(arbol, Nuevo_Entorno);
        }else{
            dec = this.declaracion.ejecutar(arbol, tabla);
        }
        if (dec) {
            let condicion:any= new Literal(this.linea, this.columna,true, tipos.BOOLEANO);
            
            if(condicion.Tipo.tipos === tipos.BOOLEANO){
                let cont = false;
                let bre = false;
                arbol.pilaCiclo.push("ciclo");
                while(condicion.valor){
                    let Entorno_bloque = new Entorno("FOR",Nuevo_Entorno);
                    for(let elemento of this.bloque1){
                        if(typeof(elemento) !== typeof("")){
                            let res = elemento.ejecutar(arbol, Entorno_bloque);
                            if (typeof(res)===typeof([])) {
                                
                                if(res.nombre === "RETURN"){
                                    if(arbol.pilaFuncion.length>0){
                                        arbol.pilaCiclo.pop();
                                        return res;
                                    }else{
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                    }
                                }
                                
                                if(res.nombre==="CONTINUE"){
                                    cont = true;
                                    break;
                                }
                                else if(res.nombre === "BREAK"){
                                    this.ast = true;
                                    bre = true;
                                    break;
                                }
                            }
                        }else{
                            console.log(arbol.errores);
                        }
                    }

                    if(cont){
                        cont = false;
                        
                        if (this.tipo ==="DEC") {
                            this.actualizacion.ejecutar(arbol, Nuevo_Entorno);
                            condicion = this.condicion.getValor(arbol, Nuevo_Entorno);
                        }else{
                            this.actualizacion.ejecutar(arbol, tabla);
                            condicion = this.condicion.getValor(arbol, tabla);
                        }
                        continue;
                    }
                    if(bre){
                        break;
                    }
                    if (this.tipo ==="DEC") {
                        this.actualizacion.ejecutar(arbol, Nuevo_Entorno);
                        condicion = this.condicion.getValor(arbol, Nuevo_Entorno);
                    }else{
                        this.actualizacion.ejecutar(arbol, tabla);
                        condicion = this.condicion.getValor(arbol, tabla);
                    }

                }
                this.ast=true;

                arbol.pilaCiclo.pop();
                return;
            }
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","Se esperaba un booleano en la condición del for", this.linea, this.columna));
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","error al declarar o asignar variable en el for", this.linea, this.columna));
        return;
        //ERROR
    }

    getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST("FOR");
        nodo.agregarHijo("FOR");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined,undefined,this.declaracion.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijo(undefined, undefined, this.condicion.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijo(undefined, undefined, this.actualizacion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        for(let element of this.bloque1){
            let nodo2 = new nodoAST("INSTRUCCIONES");
            if(typeof(element) !== typeof("")){
                nodo2.agregarHijo(undefined, undefined, element.getNodo());
            }
            nodo.agregarHijo(undefined, undefined, nodo2);
        }
        nodo.agregarHijo("}");
        return nodo;
    }
}