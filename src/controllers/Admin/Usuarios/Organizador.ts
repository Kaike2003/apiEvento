import { Request, Response } from "express";


export const Organizador = async (req: Request, res: Response) => {

    res.json({
        "Informação": "Todos os usuarios do tipo organizador serão listados aqui",
        "Os campos serão": "foto, nome, email, estado"
    })

}