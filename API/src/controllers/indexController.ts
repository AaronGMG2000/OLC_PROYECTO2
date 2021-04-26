import express , {query, Request, Response} from "express";
import { Instruccion } from "./Analizador/Abstract/instruccion";
import Excepcion from "./Analizador/exceptions/Excepcion";
import ArbolAST from './Analizador/tablaSimbolo/ArbolAST';
import Entorno from './Analizador/tablaSimbolo/Entorno';

class indexController {

    public  async index(req: Request, res: Response) {
        console.log("hola");
        res.json();
    }

    public interpretar(req: Request, res: Response) {

        const Contenido = req.body.Contenido;
        try {
            let parse = require("./Analizador/analizador");
            parse.num_error = 0;
            let ast = parse.parse(Contenido);
            const tabla = new Entorno();
            ast.global = tabla;
            ast.EjecutarBloque();
            res.json({consola: ast.consola, Errores: ast.errores});
        } catch (err) {
            console.log(err);
            res.json({
                salida : err,
                errores : err
            });
        }
    }
}

export const IndexController = new indexController();
