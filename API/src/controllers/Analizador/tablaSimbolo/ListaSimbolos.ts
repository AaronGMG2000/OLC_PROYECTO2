export default class ListaSimbolo {
    public ID:string;
    public grupo: string;
    public tipo: string;
    public fila: number;
    public columna: number;
    public ambito:string;
    public numero:number;

    constructor(numero:number,ID:string, grupo:string, tipo: string, fila:number, columna:number, ambito:string)
    {
        this.ID = ID.toUpperCase();
        this.grupo = grupo.toUpperCase();
        this.tipo = tipo.toUpperCase();
        this.fila = fila;
        this.columna = columna;
        this.ambito = ambito.toUpperCase();
        this.numero = numero;
    }

}