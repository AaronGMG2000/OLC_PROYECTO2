"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entorno_1 = __importDefault(require("./Entorno"));
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
const nodoAST_1 = require("../Abstract/nodoAST");
class ArbolAST {
    constructor(instrucciones) {
        this.FUNCIONES = new Array();
        this.errores = new Array();
        this.raiz = new nodoAST_1.nodoAST("INSTRUCCIONES");
        this.num_error = 0;
        this.pilaCiclo = [];
        this.pilaFuncion = [];
        this.c = 0;
        this.grafo = "";
        this.exec = new Array();
        this.lista_simbolos = new Array();
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno_1.default();
    }
    updateConsola(update) {
        this.consola = `${this.consola}${update}\n`;
    }
    EjecutarBloque() {
        if (this.exec.length === 0) {
            this.num_error++;
            this.errores.push(new Excepcion_1.default(this.num_error, "SEMANTICO", "No existe ninguna función principal exec", -1, -1));
            return;
        }
        if (this.exec.length > 1) {
            this.num_error++;
            this.errores.push(new Excepcion_1.default(this.num_error, "SEMANTICO", "Existen 2 exec en la ejecución", -1, -1));
            return;
        }
        for (let elemento of this.FUNCIONES) {
            if (typeof (elemento) !== typeof ("")) {
                elemento.ejecutar(this, this.global);
            }
        }
        for (let elemento of this.instrucciones) {
            if (typeof (elemento) !== typeof ("")) {
                let valor = elemento;
                if (valor.ID && !valor.UBICACION && valor.CANTIDAD && valor.DIMENSION) {
                    elemento.ejecutar(this, this.global);
                }
                else {
                    this.num_error++;
                    this.errores.push(new Excepcion_1.default(this.num_error, "SEMANTICO", "no se puede ejecutar una instrucción fuera de una función o metodo", elemento.linea, elemento.columna));
                }
            }
        }
        if (this.exec.length === 1) {
            this.exec[0].getValor(this, this.global);
        }
    }
    graphAST() {
        let r = "AST";
        let ext = "svg";
        var fs = require('fs');
        var stream = fs.createWriteStream(`./src/reportes/${r}.dot`);
        stream.once('open', () => {
            stream.write(this.getDot(this.raiz));
            stream.end();
        });
        const exec = require('child_process').exec;
        exec(`dot -T svg -o ./src/reportes/${r}.${ext} ./src/reportes/${r}.dot`, (err, stdout) => {
            if (err) {
                throw err;
            }
            exec(`start ./src/reportes/${r}.${ext}`);
        });
    }
    openFile() {
        const exec = require('child_process').exec;
        let r = "AST";
        let ext = "svg";
        try {
            let init = new nodoAST_1.nodoAST("RAIZ");
            let instr = new nodoAST_1.nodoAST("INSTRUCCIONES");
            for (let elemento of this.FUNCIONES) {
                if (typeof (elemento) !== typeof ("")) {
                    instr.agregarHijo(undefined, undefined, elemento.getNodo());
                }
            }
            if (this.exec.length === 1) {
                let nodo = new nodoAST_1.nodoAST("EXEC");
                nodo.agregarHijo("EXEC");
                nodo.agregarHijo(undefined, this.exec[0].getNodo().getHijos(), undefined);
                instr.agregarHijo(undefined, undefined, nodo);
            }
            let x = 0;
            for (let elemento of this.instrucciones) {
                if (typeof (elemento) !== typeof ("")) {
                    instr.agregarHijo(undefined, undefined, elemento.getNodo());
                }
            }
            init.agregarHijo(undefined, undefined, instr);
            this.raiz = init;
            this.graphAST();
        }
        catch (e) {
            console.log(e);
        }
    }
    getDot(raiz) {
        this.grafo = "";
        this.grafo += "digraph {\n"; //                         "     \"
        var re = /\"/gi;
        this.grafo += "n0[label=\"" + raiz.getValor().replace(re, "\\\"") + "\"];\n";
        this.c = 1;
        this.recorrerAST("n0", raiz);
        this.grafo += "}";
        return this.grafo;
    }
    recorrerAST(padre, nPadre) {
        for (let hijo of nPadre.getHijos()) {
            let nombreHijo = "n" + this.c;
            var re = /\"/gi;
            this.grafo += nombreHijo + "[label=\"" + hijo.getValor().replace(re, "\\\"") + "\"];\n";
            this.grafo += padre + "->" + nombreHijo + ";\n";
            this.c++;
            this.recorrerAST(nombreHijo, hijo);
        }
    }
}
exports.default = ArbolAST;
//# sourceMappingURL=ArbolAST.js.map