export class nodoAST {

    public hijos: Array<nodoAST> = new Array<nodoAST>();
    public valor:string;

    constructor(valor:string) {
        this.valor = valor;
    }

    public setHijos(hijos:Array<nodoAST>){
        this.hijos = hijos;
    }

    public agregarHijo(cad?:string, hijos?:Array<nodoAST>, hijo?:nodoAST){
        if (cad) {
            this.hijos.push(new nodoAST(cad));
        }
        else if (hijos) {
            for(let hijo of hijos)
            {
                this.hijos.push(hijo);
            }
        }else if(hijo){
            this.hijos.push(hijo);
        }
    }
    public agregarPrimerHijo(cad?:string, hijo?:nodoAST)
    {
        if (cad) {
            this.hijos.unshift(new nodoAST(cad));
        }else if (hijo) {
            this.hijos.unshift(hijo);
        }
    }

    public getValor():string
    {
        return this.valor;
    }
    
    public setValor(cad:string)
    {
        this.valor = cad;
    }
    
    public getHijos():Array<nodoAST> 
    {
        return this.hijos;
    }
}