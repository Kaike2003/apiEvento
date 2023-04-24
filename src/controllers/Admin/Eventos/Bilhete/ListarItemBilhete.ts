import { Request, Response } from "express"
import { prisma } from "../../../../prisma"


export const ListarItemBilhete = async (req: Request, res: Response) => {


    const listarTodosItemBilhete = await prisma.item_Bilhete.findMany().then((sucesso) => {
        res.json(sucesso)
        // console.log(sucesso)
    }).catch((error) => {
        res.json(error)
        console.log(error)
    })

}