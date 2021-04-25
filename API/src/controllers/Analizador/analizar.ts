import express , {query, Request, Response} from "express";
import ArbolAST from "./tablaSimbolo/ArbolAST";
import Entorno from "./tablaSimbolo/Entorno";

try {
    const parser = require ("./analizador");
    parser.ArbolAST = new ArbolAST([]);
    let Contenido = "print(\"hola mundo\");\n";
    Contenido += "PRINT(4*-4);\n";
    Contenido += "PRINT(false);\n";
    Contenido += "PRINT(0.0);\n";
    Contenido += "PRINT(5);\n";
    const ast = new ArbolAST(parser.parse(Contenido));
    const tabla = new Entorno();
    ast.global = tabla;
    ast.EjecutarBloque();
    console.log(ast.consola);
} catch (err) {
    console.log(err);
}