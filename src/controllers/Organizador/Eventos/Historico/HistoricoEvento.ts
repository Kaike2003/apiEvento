import { Request, Response } from "express";



export const HistoricoEvento = async (req: Request, res: Response) => {


    res.json({
        "Informação": "Aqui é onde serão criados os eventos",
        "Os campos serão": "nome,hora,localização, data inicio, data termino, descrição,tiponome,preçoquantidade "
    })

}