"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const Excepcion_1 = __importDefault(require("./analizador/Excepciones/Excepcion"));
const Arbol_1 = __importDefault(require("./analizador/tablaSimbolos/Arbol"));
const tablaSimbolos_1 = __importDefault(require("./analizador/tablaSimbolos/tablaSimbolos"));
var Errors = new Array();
class rjpController {
    helloWorld(req, res) {
        res.send("Hola Mundo JPR :D");
    }
    interpretar(req, res) {
        var parser = require('./analizador/jpr');
        const text = req.body.entrada;
        try {
            let ast = new Arbol_1.default(parser.parse(text));
            var tabla = new tablaSimbolos_1.default();
            ast.setGlobal(tabla);
            for (let m of ast.getInstrucciones()) {
                if (m instanceof Excepcion_1.default) { // ERRORES SINTACTICOS
                    Errors.push(m);
                    ast.updateConsola(m.toString());
                }
                var result = m.interpretar(ast, tabla);
                if (result instanceof Excepcion_1.default) { // ERRORES SINTACTICOS
                    Errors.push(result);
                    ast.updateConsola(result.toString());
                }
            }
            res.json({ consola: ast.getConsola(), Errores: Errors });
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
exports.controller = new rjpController();
//# sourceMappingURL=jpr.controller.js.map