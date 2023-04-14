import { Request, Response } from "express"
import { prisma } from "../../../../prisma"


export const ListarTodosOradorId = async (req: Request, res: Response) => {


    const listarTodosPalestrante = await prisma.orador_Evento.findMany().then(async (sucessoOrador_Evento) => {

        res.json(sucessoOrador_Evento)

    }).catch((error) => {
        res.status(400).json(error)
        console.log(error)
    })


}