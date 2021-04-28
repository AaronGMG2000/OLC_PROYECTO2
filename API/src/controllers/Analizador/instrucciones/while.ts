import { Instruccion } from "../Abstract/instruccion";
import Excepcion from "../exceptions/Excepcion";
import { Expresion } from "../expresiones/expresion";
import ArbolAST from "../tablaSimbolo/ArbolAST";
import Entorno from "../tablaSimbolo/Entorno";
import Tipo, { tipos } from "../tablaSimbolo/tipo";

export default class WHILE extends Instruccion {
    public condicion1: Expresion;
    public bloque1: Array<Instruccion>;
    
    constructor(linea:number, columna:number, condicion1:Expresion, bloque1: Array<Instruccion>){
        super(linea, columna);
        this.condicion1 = condicion1;
        this.bloque1 = bloque1;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        let condicion = this.condicion1.getValor(arbol, tabla);
        if(condicion.Tipo.tipos === tipos.BOOLEANO){
            let cont = false;
            let bre = false;
            arbol.pilaCiclo.push("ciclo");
            while(condicion.valor){
                let Nuevo_Entorno = new Entorno("WHILE",tabla);
                for(let elemento of this.bloque1){
                    if(typeof(elemento) !== typeof("")){
                        let res = elemento.ejecutar(arbol, Nuevo_Entorno);
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
                    continue;
                }
                if(bre){
                    arbol.pilaCiclo.pop();
                    break;
                }
                condicion = this.condicion1.getValor(arbol, tabla);
            }
            arbol.pilaCiclo.pop();
        }
        //ERROR
    }
}