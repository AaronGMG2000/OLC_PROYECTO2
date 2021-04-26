import Tipo, { tipos } from './tipo';

export default class Simbolo
{
    public tipo: Tipo;
    private identificador: String;
    public valor: any;
    public DIMENSION: number|any;
    public CANTIDAD: number|any;

    constructor(tipo: Tipo, identificador: String, valor?:any, DIMENSION:number=-1, CANTIDAD:number=-1)
    {
        this.tipo = tipo;
        this.identificador = identificador;
        this.DIMENSION = DIMENSION;
        this.CANTIDAD = CANTIDAD;
        if(valor)
        {
            if(this.DIMENSION!=-1){
                switch(this.tipo.tipos){
                    case tipos.ENTERO:
                        if(this.DIMENSION!=-1){
                            let val:number[] = [];
                            this.valor = val
                            for (let x = 0; x < this.DIMENSION; x++) {
                                this.valor.push(0);
                            }
                        }
                        break;
                    case tipos.DOBLE:
                        if(this.DIMENSION!=-1){
                            let val:number[] = [];
                            this.valor = val
                            for (let x = 0; x < this.DIMENSION; x++) {
                                this.valor.push(0.0);
                            }
                        }
                        break;  
                    case tipos.CARACTER:
                        if(this.DIMENSION!=-1){
                            let val:string[] = [];
                            this.valor = val
                            for (let x = 0; x < this.DIMENSION; x++) {
                                this.valor.push('\u0000');
                            }
                        }
                        break;
                    case tipos.CADENA:
                        if(this.DIMENSION!=-1){
                            let val:string[] = [];
                            this.valor = val
                            for (let x = 0; x < this.DIMENSION; x++) {
                                this.valor.push("");
                            }
                        }
                        break;
                    case tipos.BOOLEANO:
                        if(this.DIMENSION!=-1){
                            let val:boolean[] = [];
                            this.valor = val
                            for (let x = 0; x < this.DIMENSION; x++) {
                                this.valor.push(true);
                            }
                        }
                        break;
                    default:
                        //ERROR
                        break;
                }
            }else{
                console.log(valor);
                if(this.tipo.tipos === tipos.ENTERO){
                    valor.valor = Math.trunc(valor.valor) 
                    this.valor = valor;
                }else{
                    this.valor = valor;
                }
            }
        }
        else
        {
            switch (tipo.tipos){
                case tipos.ENTERO:
                    if(this.CANTIDAD!=-1){
                        let val:number[]=[];
                        this.valor = val;
                    }else{
                        this.valor = 0;
                    }
                    break;
                case tipos.CADENA:
                    if(this.CANTIDAD!=-1){
                        let val:string[]=[];
                        this.valor = val;
                    }else{
                        this.valor = "";
                    }
                    break;
                case tipos.CARACTER:
                    if(this.CANTIDAD!=-1){
                        let val:string[]=[];
                        this.valor = val;
                    }else{
                        this.valor = '\u0000';
                    }
                    break;
                case tipos.DOBLE:
                    if(this.CANTIDAD!=-1){
                        let val:number[]=[];
                        this.valor = val;
                    }else{
                        this.valor = 0.0;
                    }
                    break;
                case tipos.BOOLEANO:
                    if(this.CANTIDAD!=-1){
                        let val:boolean[]=[];
                        this.valor = val;
                    }else{
                        this.valor = true;
                    }
                    break;
                default:
                    break;
            }
        }
    }

    public getIdentificador() {
        return this.identificador;
    }
}