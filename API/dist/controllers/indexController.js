"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
// import ArbolAST from './Analizador/tablaSimbolo/ArbolAST';
// import Entorno from './Analizador/tablaSimbolo/Entorno';
// tslint:disable-next-line: class-name
class indexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hola");
            res.json();
        });
    }
    interpretar(req, res) {
        const parser = require("./Analizador/analizador");
        const { Contenido } = req.params;
        console.log(Contenido);
        parser.parse(Contenido);
        res.json("funciona");
        // try{
        //     let ast = new ArbolAST( parser.parse(Contenido) );
        //     var tabla = new Entorno();
        //     ast.global = tabla;
        //     ast.EjecutarBloque();
        //     res.json({consola:ast.consola, Errores: ast.errores});
        // }
        // catch(err){
        //     console.log(err);
        //     res.json({
        //         salida : err,
        //         errores : err
        //     });
        // }
    }
}
exports.IndexController = new indexController();
//# sourceMappingURL=indexController.js.map