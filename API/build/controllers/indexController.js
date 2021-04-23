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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
const ArbolAST_1 = __importDefault(require("./Analizador/tablaSimbolo/ArbolAST"));
const Entorno_1 = __importDefault(require("./Analizador/tablaSimbolo/Entorno"));
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
        const Contenido = req.body.Contenido;
        console.log(Contenido);
        parser.parse(Contenido);
        try {
            const ast = new ArbolAST_1.default(parser.parse(Contenido));
            const tabla = new Entorno_1.default();
            ast.global = tabla;
            ast.EjecutarBloque();
            res.json({ consola: ast.consola, Errores: ast.errores });
        }
        catch (err) {
            console.log(err);
            res.json({
                salida: err,
                errores: err
            });
        }
    }
}
exports.IndexController = new indexController();
//# sourceMappingURL=indexController.js.map