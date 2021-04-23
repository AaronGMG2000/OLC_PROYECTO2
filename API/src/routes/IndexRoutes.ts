import {Router} from "express";
import {IndexController} from "../controllers/indexController";
class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    public config(): void {
        this.router.post("/Compilar", IndexController.interpretar);
    }
}
const indexRoutes = new IndexRoutes();
export  default indexRoutes.router;
