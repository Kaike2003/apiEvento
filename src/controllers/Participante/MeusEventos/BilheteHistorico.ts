import { Request, Response } from "express";


export const BilheteHistorico = async (req: Request, res: Response) => {

    res.json({
        "Informações": "sobre o historico dos bilhetes",
    "Os campos serão": "nome do bilhete, tipo de bilhete, preço ,data de inicio e termino do evento, localização, estado do evento"
    })

}