"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipos = void 0;
const nodoAST_1 = require("../Abstract/nodoAST");
class Tipo {
    constructor(tipos) {
        this.tipos = tipos;
    }
    equals(obj) {
        return this.tipos == obj.tipos;
    }
    getTipo() {
        if (this.tipos === tipos.BOOLEANO) {
            return "BOOLEAN";
        }
        else if (this.tipos === tipos.ENTERO) {
            return "INT";
        }
        else if (this.tipos === tipos.CADENA) {
            return "STRING";
        }
        else if (this.tipos === tipos.CARACTER) {
            return "CARACTER";
        }
        else if (this.tipos === tipos.DOBLE) {
            return "DOUBLE";
        }
        return "";
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("TIPO");
        nodo.agregarHijo(this.tipos);
        return nodo;
    }
}
exports.default = Tipo;
var tipos;
(function (tipos) {
    tipos["ENTERO"] = "ENTERO";
    tipos["DOBLE"] = "DOBLE";
    tipos["CARACTER"] = "CARACTER";
    tipos["BOOLEANO"] = "BOOLEANO";
    tipos["CADENA"] = "CADENA";
    tipos["ERROR"] = "ERROR";
})(tipos = exports.tipos || (exports.tipos = {}));
//# sourceMappingURL=tipo.js.map