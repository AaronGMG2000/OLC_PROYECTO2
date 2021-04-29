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
const Excepcion_1 = __importDefault(require("./Analizador/exceptions/Excepcion"));
const ArbolAST_1 = __importDefault(require("./Analizador/tablaSimbolo/ArbolAST"));
const Entorno_1 = __importDefault(require("./Analizador/tablaSimbolo/Entorno"));
class indexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json();
        });
    }
    interpretar(req, res) {
        const Contenido = req.body.Contenido;
        try {
            let parse = require("./Analizador/analizador");
            parse.num_error = 0;
            let ast = new ArbolAST_1.default([]);
            try {
                ast = parse.parse(Contenido);
            }
            catch (e) {
                ast.num_error++;
                ast.errores.push(new Excepcion_1.default(ast.num_error, "SINTACTICO", "Error inrecuperable", -1, -1));
            }
            if (typeof (ast) === typeof (new ArbolAST_1.default([]))) {
                const tabla = new Entorno_1.default();
                ast.global = tabla;
                ast.EjecutarBloque();
                res.json({ consola: ast.consola, Errores: ast.errores });
            }
            else {
                res.json({ consola: "", Errores: [] });
            }
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