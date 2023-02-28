import { Request, Response } from "express";


export const Historico = async (req: Request, res: Response) => {

    res.json({
        "Informações": "sobre o historico dos eventos",
        "Os campos serão": "Foto, nome do evento ,categoria do evento, preço, data de inicio e termino do evento, localização, estado do evento"
    })

}