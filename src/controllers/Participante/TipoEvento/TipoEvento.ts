import { Request, Response } from "express";


export const TipoEvento = async (req: Request, res: Response) => {

    res.json({
        "Informação": "Aqui serão listados os eventos de acordo o tipo",
        "Os campos serão": "nome, descricao, categoria do evento, bilhetes, localização, hora, data de inicio, data de termino, estado do evento, bilhetes desponiveis"
    })

}