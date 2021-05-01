import ArbolAST from './ArbolAST';
import Entorno from './Entorno';
import Tipo, { tipos } from './tipo';

export default class Simbolo
{
    public tipo: Tipo;
    private identificador: string;
    public valor: any;
    public DIMENSION: number|any;
    public CANTIDAD: number|any;
    public LOV:string = "";
    constructor(tipo: Tipo, identificador: string, valor?:any, DIMENSION:number=-1, CANTIDAD:number=-1)
    {
        this.tipo = tipo;
        this.identificador = identificador;
        this.DIMENSION = DIMENSION;
        this.CANTIDAD = CANTIDAD;
        if(valor)
        {
            this.valor = valor;
            if (valor.valor || typeof(this.valor.valor)===typeof(true)) {
                if(this.DIMENSION!=-1 && typeof(valor.valor)!==typeof([])){
                    this.LOV = "VECTOR";
                    switch(this.tipo.tipos){
                        case tipos.ENTERO:
                            if(this.DIMENSION!=-1){
                                let val:number[] = [];
                                this.valor.valor = val
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push(0);
                                }
                            }
                            break;
                        case tipos.DOBLE:
                            if(this.DIMENSION!=-1){
                                let val:number[] = [];
                                this.valor.valor = val
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push(0.0);
                                }
                            }
                            break;  
                        case tipos.CARACTER:
                            if(this.DIMENSION!=-1){
                                let val:string[] = [];
                                this.valor.valor = val
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push("\u0000");
                                }
                            }
                            break;
                        case tipos.CADENA:
                            if(this.DIMENSION!=-1){
                                let val:string[] = [];
                                this.valor.valor = val
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push("");
                                }
                            }
                            break;
                        case tipos.BOOLEANO:
                            if(this.DIMENSION!=-1){
                                let val:boolean[] = [];
                                this.valor.valor = val
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push(true);
                                }
                            }
                            break;
                        default:
                            //ERROR
                            break;
                    }
                }else{
                    if(this.tipo.tipos === tipos.ENTERO && typeof(valor.valor)!==typeof([])){
                        valor.valor = Math.trunc(valor.valor) 
                        this.valor = valor;
                    }else{
                        if (this.DIMENSION!=-1) {
                            this.LOV = "VECTOR";
                        }
                        this.valor = valor;
                    }
                }
            }else
            {
                this.valor = valor;
                
                switch (tipo.tipos){
                    case tipos.ENTERO:
                        if(this.CANTIDAD!=-1){
                            let val:number[]=[];
                            this.valor.valor = val;
                        }else{
                            this.valor.valor = 0;
                        }
                        break;
                    case tipos.CADENA:
                        if(this.CANTIDAD!=-1){
                            let val:string[]=[];
                            this.valor.valor = val;
                        }else{
                            this.valor.valor = "";
                        }
                        break;
                    case tipos.CARACTER:
                        if(this.CANTIDAD!=-1){
                            let val:string[]=[];
                            this.valor.valor = val;
                        }else{
                            this.valor.valor = '\u0000';
                        }
                        break;
                    case tipos.DOBLE:
                        if(this.CANTIDAD!=-1){
                            let val:number[]=[];
                            this.valor.valor = val;
                        }else{
                            this.valor.valor = 0.0;
                        }
                        break;
                    case tipos.BOOLEANO:
                        if(this.CANTIDAD!=-1){
                            let val:boolean[]=[];
                            this.valor.valor = val;
                        }else{
                            this.valor.valor = true;
                        }
                        break;
                    default:
                        break;
                }
                if (this.CANTIDAD!==-1) {
                    this.LOV = "LISTA";
                }
            }
        }
        
    }

    public getValor(arbol:ArbolAST, tabla:Entorno){
        return this.valor;
    }

    public getIdentificador() {
        return this.identificador;
    }
}