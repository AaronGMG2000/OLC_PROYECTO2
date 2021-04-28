import express , {query, Request, Response} from "express";
import { Instruccion } from "./Analizador/Abstract/instruccion";
import Excepcion from "./Analizador/exceptions/Excepcion";
import ArbolAST from './Analizador/tablaSimbolo/ArbolAST';
import Entorno from './Analizador/tablaSimbolo/Entorno';

class indexController {

    public  async index(req: Request, res: Response) {
        res.json();
    }

    public interpretar(req: Request, res: Response) {

        const Contenido = req.body.Contenido;
        try {
            let parse = require("./Analizador/analizador");
            parse.num_error = 0;
            let ast = new ArbolAST([]);
            try{
                ast = parse.parse(Contenido);
            }catch(e){
                ast.num_error++;
                ast.errores.push(new Excepcion(ast.num_error, "SINTACTICO","Error inrecuperable",-1,-1));
            }
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
