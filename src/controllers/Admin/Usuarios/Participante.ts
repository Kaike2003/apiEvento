import { Request, Response } from "express";


export const Participante = async (req: Request, res: Response) => {

    res.json({
        "Informação": "Todos os usuarios do tipo participante serão listados aqui",
        "Os campos serão": "foto, nome, email, estado"
    })

}