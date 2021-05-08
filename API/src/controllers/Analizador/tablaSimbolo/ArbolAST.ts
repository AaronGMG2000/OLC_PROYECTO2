import Entorno from "./Entorno";
import Excepcion from "../exceptions/Excepcion";
import { Instruccion } from "../Abstract/instruccion";
import ListaSimbolo from "./ListaSimbolos";
import { Expresion } from "../expresiones/expresion";
import { nodoAST } from "../Abstract/nodoAST";


export default class ArbolAST {
    public instrucciones: Array<any>;
    public FUNCIONES: Array<Instruccion> = new Array<Instruccion>();
    public errores: Array<Excepcion> = new Array<Excepcion>();
    public consola: String;
    public global: Entorno;
    public raiz:nodoAST = new nodoAST("INSTRUCCIONES");
    public num_error:number = 0;
    public pilaCiclo:any[] = [];
    public pilaFuncion:any[] = [];
    private c:number=0;
    private grafo:string="";
    public exec: Array<Expresion> = new Array<Expresion>();
    public lista_simbolos:Array<any> = new Array<any>();
    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno();
    }

    public updateConsola(update:String){
        this.consola = `${this.consola}${update}\n`;
    }

    public EjecutarBloque() {
        if (this.exec.length===0) {
            this.num_error++;
            this.errores.push(new Excepcion(this.num_error, "SEMANTICO", "No existe ninguna función principal exec", -1, -1));
            return;
        }
        if (this.exec.length>1) {
            this.num_error++;
            this.errores.push(new Excepcion(this.num_error, "SEMANTICO", "Existen 2 exec en la ejecución", -1, -1));
            return;
        }
        for(let elemento of this.FUNCIONES){
            if(typeof(elemento) !== typeof("")){
                elemento.ejecutar(this, this.global);
            }
        }
        
        for(let elemento of this.instrucciones){
            if(typeof(elemento) !== typeof("")){
                let valor = elemento;
                if (valor.ID && !valor.UBICACION && valor.CANTIDAD && valor.DIMENSION) {
                    elemento.ejecutar(this, this.global);
                }else{
                    this.num_error++;
                    this.errores.push(new Excepcion(this.num_error, "SEMANTICO", "no se puede ejecutar una instrucción fuera de una función o metodo", elemento.linea, elemento.columna));
                }
            }
        }
        if (this.exec.length===1) {
            this.exec[0].getValor(this, this.global);
        }
    }

    public graphAST():void
    {
        let r:string = "AST";
        let ext:string = "svg";
        var fs = require('fs');
        var stream = fs.createWriteStream(`./src/reportes/${r}.dot`);
        stream.once('open',() =>{
            stream.write(this.getDot(this.raiz));
            stream.end();

        });
        const exec = require('child_process').exec;
        exec(`dot -T svg -o ./src/reportes/${r}.${ext} ./src/reportes/${r}.dot`, (err:any, stdout:any)=>{
            if (err) {
                throw err;
            }
            exec(`start ./src/reportes/${r}.${ext}`);
        });
    }
    
    public openFile(){
        const exec = require('child_process').exec;
        let r:string = "AST";
        let ext:string = "svg";
        try{
            let init:nodoAST = new nodoAST("RAIZ");
            let instr:nodoAST  = new nodoAST("INSTRUCCIONES");


            for(let elemento of this.FUNCIONES){
                if(typeof(elemento) !== typeof("")){
                    instr.agregarHijo(undefined, undefined, elemento.getNodo());
                }
            }
            if (this.exec.length===1) {
                let nodo = new nodoAST("EXEC");
                nodo.agregarHijo("EXEC");
                nodo.agregarHijo(undefined, this.exec[0].getNodo().getHijos(), undefined);
                instr.agregarHijo(undefined, undefined, nodo);
            }
            let x = 0;
            for(let elemento of this.instrucciones){
                if (typeof(elemento)!==typeof("")) {
                    instr.agregarHijo(undefined, undefined, elemento.getNodo());
                }
            }
            init.agregarHijo(undefined, undefined, instr);
            this.raiz = init;
            this.graphAST();
        }catch(e){console.log(e)}
    }

    public getDot(raiz:nodoAST):string
    {
        this.grafo = "";
        this.grafo += "digraph {\n";//                         "     \"
        var re = /\"/gi; 
        this.grafo += "n0[label=\"" + raiz.getValor().replace(re, "\\\"") + "\"];\n";
        this.c = 1;
        this.recorrerAST("n0",raiz);
        this.grafo += "}";
        return this.grafo;
    }
    
    public recorrerAST(padre:string , nPadre:nodoAST)
    {
        for(let hijo of nPadre.getHijos())
        {
            let nombreHijo:string = "n" + this.c;
            var re = /\"/gi; 
            this.grafo += nombreHijo + "[label=\"" + hijo.getValor().replace(re, "\\\"") + "\"];\n";
            this.grafo += padre + "->" + nombreHijo + ";\n";
            this.c++;
            this.recorrerAST(nombreHijo,hijo);
        }
    }
}