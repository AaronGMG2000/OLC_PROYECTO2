export default class Tipo
{
    public tipos: tipos;
    
    constructor(tipos: tipos){
        this.tipos = tipos;
    }

    public equals(obj: any){
        return this.tipos == obj.tipos;
    }
}

export enum tipos
{
    ENTERO, 
    DOBLE,
    CARACTER,
    BOOLEANO,
    CADENA,
    ERROR
}