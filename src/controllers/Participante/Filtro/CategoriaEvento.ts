import { Request, Response } from "express";


export const CategoriaEvento = async (req: Request, res: Response) => {


    res.json({"informação": "Os eventos serão lisados pela categoria"})

}