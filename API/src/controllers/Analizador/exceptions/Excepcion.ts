export default class Excepcion {
    public numero:number;
    public tipo: String;
    public descripcion: String;
    public fila: Number;
    public columna: Number;

    constructor(num: number, tipo:String,descripcion:String, fila:Number, columna:Number)
    {
        this.numero = num;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }

    public toString():String{
        return this.tipo + " - " + this.descripcion + " [" + this.fila + ", " + this.columna + "]";
    }
    public imprimir(){
        return this.toString() + "\n";
    }
}