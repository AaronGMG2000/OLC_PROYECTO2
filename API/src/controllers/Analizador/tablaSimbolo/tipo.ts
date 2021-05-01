export default class Tipo
{
    public tipos: tipos;
    
    constructor(tipos: tipos){
        this.tipos = tipos;
    }

    public equals(obj: any){
        return this.tipos == obj.tipos;
    }
    public getTipo(){
        if (this.tipos === tipos.BOOLEANO) {
            return "BOOLEAN";
        }else if(this.tipos === tipos.ENTERO){
            return "INT";
        }else if(this.tipos === tipos.CADENA){
            return "STRING";
        }else if(this.tipos === tipos.CARACTER){
            return "CARACTER";
        }else if(this.tipos === tipos.DOBLE){
            return "DOUBLE";
        }
        return "";
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