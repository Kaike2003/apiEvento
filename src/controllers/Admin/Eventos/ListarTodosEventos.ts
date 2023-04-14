import { Request, Response } from "express"
import { prisma } from "../../../prisma"


export const ListarTodosEventos = async (req: Request, res: Response) => {


    const listarTodosEvento = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: false
        }

    }).then((sucesso) => {
        res.json(sucesso)
        // console.log(sucesso)
    }).catch((error) => {
        res.json(error)
        console.log(error)
    })

}