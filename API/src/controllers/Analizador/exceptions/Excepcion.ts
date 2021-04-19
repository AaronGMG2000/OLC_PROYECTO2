export default class Excepcion {
    public tipo: String;
    public descripcion: String;
    public fila: Number;
    public columna: Number;

    constructor(tipo: String, descripcion:String, fila:Number, columna:Number)
    {
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