import { Request, Response } from "express";



export const AtualizarEvento = async (req: Request, res: Response) => {

    res.json({
        "Informação": "Aqui é onde serão atualizadas as informações do evento",
        "Os campos serão": "foto, nome, hora, localização, data inicio, data termino, orador, descrição"
    })

}