import express , {query, Request, Response} from 'express';
class indexController{
    
    public  async index(req:Request, res:Response){
        const text = req.body.entrada;
        res.json();
    }
}

export const IndexController = new indexController();
