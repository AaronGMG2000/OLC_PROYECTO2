"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(tipo, identificador, valor) {
        this.tipo = tipo;
        this.identificador = identificador;
        if (valor) {
            this.valor = valor;
        }
        else {
            this.valor = null;
        }
    }
    getIdentificador() {
        return this.identificador;
    }
}
exports.default = Simbolo;
//# sourceMappingURL=simbolo.js.map