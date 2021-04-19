import Tipo from './tipo';

export default class Simbolo
{
    public tipo: Tipo;
    private identificador: String;
    public valor: any;

    constructor(tipo: Tipo, identificador: String, valor?:any)
    {
        this.tipo = tipo;
        this.identificador = identificador;
        if(valor)
        {
            this.valor = valor;
        }
        else
        {
            this.valor = null;
        }

    }

    public getIdentificador() {
        return this.identificador;
    }
}