"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodoAST = void 0;
class nodoAST {
    constructor(valor) {
        this.hijos = new Array();
        this.valor = valor;
    }
    setHijos(hijos) {
        this.hijos = hijos;
    }
    agregarHijo(cad, hijos, hijo) {
        if (cad) {
            this.hijos.push(new nodoAST(cad));
        }
        else if (hijos) {
            for (let hijo of hijos) {
                this.hijos.push(hijo);
            }
        }
        else if (hijo) {
            this.hijos.push(hijo);
        }
    }
    agregarPrimerHijo(cad, hijo) {
        if (cad) {
            this.hijos.unshift(new nodoAST(cad));
        }
        else if (hijo) {
            this.hijos.unshift(hijo);
        }
    }
    getValor() {
        return this.valor;
    }
    setValor(cad) {
        this.valor = cad;
    }
    getHijos() {
        return this.hijos;
    }
}
exports.nodoAST = nodoAST;
//# sourceMappingURL=nodoAST.js.map