import express , {query, Request, Response} from "express";
import ArbolAST from './Analizador/tablaSimbolo/ArbolAST';
import Entorno from './Analizador/tablaSimbolo/Entorno';

// tslint:disable-next-line: class-name
class indexController {

    public  async index(req: Request, res: Response) {
        console.log("hola");
        res.json();
    }

    public interpretar(req: Request, res: Response) {
        const parser = require("./Analizador/analizador");
        const Contenido = req.body.Contenido;
        console.log(Contenido);
        parser.parse(Contenido);
        try {
            const ast = new ArbolAST( parser.parse(Contenido) );

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
