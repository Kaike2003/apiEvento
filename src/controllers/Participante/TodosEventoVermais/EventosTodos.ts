import { Request, Response } from "express";


export const EventosTodos = async (req: Request, res: Response) => {

    res.json({
        "informação": "Aqui serão listados todos os eventos",
        "Os campos serão": "nome, descricao, categoria do evento, bilhetes, localização, hora, data de inicio, data de termino, estado do evento, bilhetes desponiveis"
    })

}