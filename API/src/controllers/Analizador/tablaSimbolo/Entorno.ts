import Simbolo from "./simbolo";
import Tipo, { tipos } from "./tipo";

export default class Entorno
{
    public nombre:string;
    public tabla:Map<String, Simbolo>;
    private anterior: Entorno|any;

    constructor(nombre:string = "GLOBAL", anterior?:Entorno){
        this.nombre = nombre;
        this.anterior = anterior;
        this.tabla = new Map<String, Simbolo>();
    }

    public set(simbolo:String, valor:any, tipo:Tipo, DIMENSION:number=-1, CANTIDAD:number=-1): void{
        simbolo = simbolo.toUpperCase();
        if(!this.tabla.has(simbolo)){
            this.tabla.set(simbolo, new Simbolo(tipo, simbolo, valor, DIMENSION, CANTIDAD));
        }else{
            //Error
            console.log("error")
        }
    }

    public update(simbolo:String, valor:any, POSICION:any=-1):boolean{
        simbolo = simbolo.toUpperCase();
        for(var temp:Entorno = this; temp!=null; temp = temp.anterior ){
            if (temp.tabla.has(simbolo)) {
                var anterior = temp.tabla.get(simbolo);
                if (anterior) {
                    if(anterior.DIMENSION==-1 && anterior.CANTIDAD==-1){
                        anterior.valor = valor;
                        temp.tabla.set(simbolo, anterior);
                        return true;
                    }else if(POSICION!=-1){
                        anterior.valor[POSICION.valor] = valor.valor;
                        return true;
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
        for(var temp:Entorno = this; temp!=null; temp = temp.anterior ){
            if (temp.tabla.has(variable)) {
                var result = temp.tabla.get(variable);
                if (result) {
                    return result;
                }
            }
        }
        //Error
        return new Simbolo(new Tipo(tipos.ERROR), 'ERROR', undefined);
    }
}