import { Request, Response } from "express";


export const HistoricoCompra = async (req: Request, res: Response) => {


    res.json({
        "Informação": "aqui será o metodo get",
        "Os campos serão": "Nome , valor, data, estado do bilhete"
    })

}