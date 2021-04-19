import Simbolo from "./Simbolo";
import Tipo, {tipos} from "./Tipo";

export default class Entorno
{
    public tabla:Map<String, Simbolo>;
    private anterior: Entorno;

    constructor(anterior?:Entorno){
        this.anterior = anterior;
        this.tabla = new Map<String, Simbolo>();
    }

    public set(simbolo:String, valor:any, tipo:Tipo): void{
        if(!this.tabla.has(simbolo)){
            this.tabla.set(simbolo, new Simbolo(tipo, simbolo, valor));
        }else{
            //Error
            console.log("error")
        }
    }

    public update(simbolo:String, valor:any):void{
        for(var temp:Entorno = this; temp!=null; temp = temp.anterior ){
            if (temp.tabla.has(simbolo)) {
                var anterior = temp.tabla.get(simbolo);
                anterior.valor = valor;
                temp.tabla.set(simbolo, anterior);
                return;
            }
        }
        //Error
        console.log("error")
    }

    public get(variable:String):Simbolo{
        for(var temp:Entorno = this; temp!=null; temp = temp.anterior ){
            if (temp.tabla.has(variable)) {
                return temp.tabla.get(variable);
            }
        }
        //Error
        return new Simbolo(new Tipo(tipos.ERROR), 'ERROR', undefined);
    }
}