import { Request, Response } from "express"
import { prisma } from "../../../../prisma"


export const ListarTodosPalestranteId = async (req: Request, res: Response) => {


    const listarTodosPalestrante = await prisma.palestrante_Evento.findMany().then(async (sucessoPalestrante_Evento) => {

        res.json(sucessoPalestrante_Evento)

    }).catch((error) => {
        res.status(400).json(error)
        console.log(error)
    })


}