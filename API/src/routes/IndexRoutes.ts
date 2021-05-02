import {Router} from "express";
import {IndexController} from "../controllers/indexController";
class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    public config(): void {
        this.router.post("/Compilar", IndexController.interpretar);
        this.router.post("/GRAFICAR", IndexController.open);
    }
}
const indexRoutes = new IndexRoutes();
export  default indexRoutes.router;
