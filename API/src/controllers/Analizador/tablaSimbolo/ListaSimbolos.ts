export default class ListaSimbolo {
    public ID:String;
    public grupo: String;
    public tipo: String;
    public fila: Number;
    public columna: Number;
    public ambito:String;

    constructor(ID:String, grupo:String, tipo: String, descripcion:String, fila:Number, columna:Number, ambito:String)
    {
        this.ID = ID;
        this.grupo = grupo;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.ambito = ambito;
    }

}