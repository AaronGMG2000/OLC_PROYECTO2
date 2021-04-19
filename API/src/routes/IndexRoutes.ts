import {IndexController} from '../controllers/indexController';
import {Request, Response, Router} from 'express';
class IndexRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/cargarTemporal',IndexController.index);
    }
}
const indexRoutes = new IndexRoutes();
export  default indexRoutes.router;