import { Request, Response } from "express";


export const Compra = async (req: Request, res: Response) => {


    res.json({
        "Informação": "A compra será feita aqui",
        "Os campos serão": "quantidade, Total a pagar, Método de pagamento(Dinheiro)"
    })

}