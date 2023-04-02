import { Request, Response } from "express";
import { QueryParams } from "../../../../validation";



export const Compra = async (req: Request, res: Response) => {

    const { idUtilizador, idEvento }: QueryParams = req.params
    res.json({
        "Id do utilizador": idUtilizador,
        "Id do evento": idEvento
    })


}