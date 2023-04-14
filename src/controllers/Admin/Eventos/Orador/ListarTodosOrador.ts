import { Request, Response } from "express"
import { prisma } from "../../../../prisma"


export const ListarTodosOrador = async (req: Request, res: Response) => {


    const listarTodosOrador = await prisma.orador.findMany().then(async (sucessoOrador) => {


        res.json(sucessoOrador)
        console.log(sucessoOrador)


    }).catch((error) => {
        res.status(400).json(error)
        console.log(error)
    })

}