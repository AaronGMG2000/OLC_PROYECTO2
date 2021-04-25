"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArbolAST_1 = __importDefault(require("./tablaSimbolo/ArbolAST"));
const Entorno_1 = __importDefault(require("./tablaSimbolo/Entorno"));
try {
    const parser = require("./analizador");
    parser.ArbolAST = new ArbolAST_1.default([]);
    let Contenido = "print(\"hola mundo\");\n";
    Contenido += "PRINT(4*-4);\n";
    Contenido += "PRINT(false);\n";
    Contenido += "PRINT(0.0);\n";
    Contenido += "PRINT(5);\n";
    const ast = new ArbolAST_1.default(parser.parse(Contenido));
    const tabla = new Entorno_1.default();
    ast.global = tabla;
    ast.EjecutarBloque();
    console.log(ast.consola);
}
catch (err) {
    console.log(err);
}
//# sourceMappingURL=analizar.js.map