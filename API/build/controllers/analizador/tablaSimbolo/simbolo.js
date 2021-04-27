"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tipo_1 = require("./tipo");
class Simbolo {
    constructor(tipo, identificador, valor, DIMENSION = -1, CANTIDAD = -1) {
        this.tipo = tipo;
        this.identificador = identificador;
        this.DIMENSION = DIMENSION;
        this.CANTIDAD = CANTIDAD;
        if (valor) {
            if (valor.valor) {
                if (this.DIMENSION != -1) {
                    switch (this.tipo.tipos) {
                        case tipo_1.tipos.ENTERO:
                            if (this.DIMENSION != -1) {
                                let val = [];
                                this.valor.valor = val;
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push(0);
                                }
                            }
                            break;
                        case tipo_1.tipos.DOBLE:
                            if (this.DIMENSION != -1) {
                                let val = [];
                                this.valor.valor = val;
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push(0.0);
                                }
                            }
                            break;
                        case tipo_1.tipos.CARACTER:
                            if (this.DIMENSION != -1) {
                                let val = [];
                                this.valor.valor = val;
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push('\u0000');
                                }
                            }
                            break;
                        case tipo_1.tipos.CADENA:
                            if (this.DIMENSION != -1) {
                                let val = [];
                                this.valor.valor = val;
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push("");
                                }
                            }
                            break;
                        case tipo_1.tipos.BOOLEANO:
                            if (this.DIMENSION != -1) {
                                let val = [];
                                this.valor.valor = val;
                                for (let x = 0; x < this.DIMENSION; x++) {
                                    this.valor.valor.push(true);
                                }
                            }
                            break;
                        default:
                            //ERROR
                            break;
                    }
                }
                else {
                    if (this.tipo.tipos === tipo_1.tipos.ENTERO) {
                        valor.valor = Math.trunc(valor.valor);
                        this.valor = valor;
                    }
                    else {
                        this.valor = valor;
                    }
                }
            }
            else {
                this.valor = valor;
                switch (tipo.tipos) {
                    case tipo_1.tipos.ENTERO:
                        if (this.CANTIDAD != -1) {
                            let val = [];
                            this.valor.valor = val;
                        }
                        else {
                            this.valor.valor = 0;
                        }
                        break;
                    case tipo_1.tipos.CADENA:
                        if (this.CANTIDAD != -1) {
                            let val = [];
                            this.valor.valor = val;
                        }
                        else {
                            this.valor.valor = "";
                        }
                        break;
                    case tipo_1.tipos.CARACTER:
                        if (this.CANTIDAD != -1) {
                            let val = [];
                            this.valor.valor = val;
                        }
                        else {
                            this.valor.valor = '\u0000';
                        }
                        break;
                    case tipo_1.tipos.DOBLE:
                        if (this.CANTIDAD != -1) {
                            let val = [];
                            this.valor.valor = val;
                        }
                        else {
                            this.valor.valor = 0.0;
                        }
                        break;
                    case tipo_1.tipos.BOOLEANO:
                        if (this.CANTIDAD != -1) {
                            let val = [];
                            this.valor.valor = val;
                        }
                        else {
                            this.valor.valor = true;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    getIdentificador() {
        return this.identificador;
    }
}
exports.default = Simbolo;
//# sourceMappingURL=simbolo.js.map