"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipos = void 0;
class Tipo {
    constructor(tipos) {
        this.tipos = tipos;
    }
    equals(obj) {
        return this.tipos == obj.tipos;
    }
}
exports.default = Tipo;
var tipos;
(function (tipos) {
    tipos[tipos["ENTERO"] = 0] = "ENTERO";
    tipos[tipos["DECIMAL"] = 1] = "DECIMAL";
    tipos[tipos["CARACTER"] = 2] = "CARACTER";
    tipos[tipos["BOOLEANO"] = 3] = "BOOLEANO";
    tipos[tipos["CADENA"] = 4] = "CADENA";
    tipos[tipos["ERROR"] = 5] = "ERROR";
})(tipos = exports.tipos || (exports.tipos = {}));
//# sourceMappingURL=tipo.js.map