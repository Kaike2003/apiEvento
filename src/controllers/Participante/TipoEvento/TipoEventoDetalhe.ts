import { Request, Response } from "express";


export const TipoEventoDetalhe = async (req: Request, res: Response) => {

    res.json({
        "Informação": "Aqui serão detalhado um único evento e terá o seu tipo",
        "Os campos serão": "nome, descricao, categoria do evento, bilhetes, localização, hora, data de inicio, data de termino, estado do evento, bilhetes desponiveis"
    })

}