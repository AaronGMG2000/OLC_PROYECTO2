import Simbolo from "./simbolo";
import Tipo, { tipos } from "./tipo";

export default class Entorno
{
    public nombre:string;
    public tabla:Map<String, Simbolo>;
    private anterior: Entorno|any;
    constructor(nombre:string= "GLOBAL", anterior?:Entorno){
        this.nombre = nombre;
        this.anterior = anterior;
        this.tabla = new Map<String, Simbolo>();
    }

    public set(simbolo:string, valor:any, tipo:Tipo, DIMENSION:number=-1, CANTIDAD:number=-1): void{
        simbolo = simbolo.toUpperCase();
        if(!this.tabla.has(simbolo)){
            this.tabla.set(simbolo, new Simbolo(tipo, simbolo, valor, DIMENSION, CANTIDAD));
        }
    }

    public update(simbolo:String, valor:any, POSICION:any=-1):boolean{
        simbolo = simbolo.toUpperCase();
        for(var temp:Entorno = this; temp!=null; temp = temp.anterior ){
            if (temp.tabla.has(simbolo)) {
                var ant = temp.tabla.get(simbolo);
                if (ant) {
                    if(ant.DIMENSION==-1 && ant.CANTIDAD==-1){
                        ant.valor = valor;
                        temp.tabla.set(simbolo, ant);
                        return true;
                    }else if(POSICION!=-1){
                        if ((POSICION.valor < ant.DIMENSION || POSICION.valor < ant.CANTIDAD) && POSICION.valor>=0) {
                            if (POSICION.Tipo.tipos === tipos.ENTERO) {
                                ant.valor.valor[POSICION.valor] = valor.valor;
                                temp.tabla.set(simbolo, ant);
                                return true;
                            }
                        }
                        //ERROR
                        return false
                    }else{
                        
                        //ERROR
                        return false;
                    }
                }
            }
        }
        //Error
        return false;
    }

    public get(variable:String):Simbolo{
        variable = variable.toUpperCase();
        let x = 0;
        for(var temp:Entorno = this; temp!=null; temp = temp.anterior ){
            if (temp.tabla.has(variable)) {
                var result = temp.tabla.get(variable);
                if (result) {
                    return result;
                }
            }
            x++
        }
        //Error
        return new Simbolo(new Tipo(tipos.ERROR), 'ERROR', undefined);
    }

    public getLocal(variable:String):Simbolo{
        variable = variable.toUpperCase();
        if (this.tabla.has(variable)) {
            var result = this.tabla.get(variable);
            if (result) {
                return result;
            }
        }
        return new Simbolo(new Tipo(tipos.ERROR), 'ERROR', undefined);
    }
}