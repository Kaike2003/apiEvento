import { Request, Response } from "express";



export const AtualizarBilhete= async (req: Request, res: Response) => {


    res.json({
        "Informação": "Aqui é onde serão atualizado os bilhetes",
        "Os campos serão": "tipoBilehte, nomeBilhete, preço, quantidade, data inicio, data termino"
    })

}