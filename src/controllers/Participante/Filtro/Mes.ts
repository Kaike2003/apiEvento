import { Request, Response } from "express";


export const Mes = async (req: Request, res: Response) => {


    res.json({"informação": "Os eventos serão lisados pelo mês"})

}