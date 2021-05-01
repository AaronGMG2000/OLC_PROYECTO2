"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entorno_1 = __importDefault(require("./Entorno"));
const Excepcion_1 = __importDefault(require("../exceptions/Excepcion"));
class ArbolAST {
    constructor(instrucciones) {
        this.FUNCIONES = new Array();
        this.errores = new Array();
        this.num_error = 0;
        this.pilaCiclo = [];
        this.pilaFuncion = [];
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
        if (this.exec.length === 1) {
            this.exec[0].getValor(this, this.global);
        }
        for (let elemento of this.instrucciones) {
            if (typeof (elemento) !== typeof ("")) {
                elemento.ejecutar(this, this.global);
            }
        }
    }
}
exports.default = ArbolAST;
//# sourceMappingURL=ArbolAST.js.map