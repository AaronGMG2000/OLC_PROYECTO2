import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
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
            let condicion:any=undefined;
            if (this.tipo ==="DEC") {
                condicion = this.condicion.getValor(arbol, Nuevo_Entorno);
            }else{
                condicion = this.condicion.getValor(arbol, tabla);
            }
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
                arbol.pilaCiclo.pop();
            }
        }
        //ERROR
    }
}