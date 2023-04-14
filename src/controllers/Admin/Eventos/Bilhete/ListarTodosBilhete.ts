import { Request, Response } from "express"
import { prisma } from "../../../../prisma"


export const ListarTodosBilhete = async (req: Request, res: Response) => {


    const listarTodosBilhete = await prisma.bilhete.findMany().then((sucesso) => {
        res.json(sucesso)
        // console.log(sucesso)
    }).catch((error) => {
        res.json(error)
        console.log(error)
    })

}