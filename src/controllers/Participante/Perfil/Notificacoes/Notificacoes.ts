import { Request, Response } from "express";


export const Notificacoes = async (req: Request, res: Response) => {


    res.json({
        "Informação": "aqui será o metodo get",
        "Os campos serão": "Nome , data"
    })

}