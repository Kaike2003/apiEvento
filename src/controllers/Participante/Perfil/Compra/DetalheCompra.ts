import { Request, Response } from "express";


export const DetalheCompra = async (req: Request, res: Response) => {


    res.json({
        "Informação": "aqui será o metodo get",
        "Os campos serão": "aqui irão os datalhes da compra"
    })

}