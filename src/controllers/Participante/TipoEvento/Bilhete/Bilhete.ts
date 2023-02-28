import { Request, Response } from "express";


export const Bilhete =async (req: Request, res: Response) => {
    

    res.json({
        "Informação": "Aqui será apresentado o bilhete",
        "Os campos serão" : "nome do bilhete, tipo de bilhete, preco"
    })

}