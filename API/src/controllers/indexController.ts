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
        let parser = require("./Analizador/analizador");
        parser.ArbolAST = new ArbolAST([]);
        const Contenido = req.body.Contenido;
        try {
            let ast = new ArbolAST([]);
            ast = parser.parse(Contenido);
            const tabla = new Entorno();
            ast.global = tabla;
            ast.consola = "";
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
