import { Request, Response } from "express"
import { prisma } from "../../../prisma"


export const NovosEventos = async (req: Request, res: Response) => {


    const novosEventos = await prisma.evento.findMany({
        where: {
            publicado: true,
            aprovado: true,
            banido: false,
        },
        include: {
            bilhete: {
                include: {
                    evento: {
                        include: {
                            bilhete: true
                        }
                    }
                },
                take: 1
            }
        },
        orderBy: {
            at_create: "desc",
        },
        take: 8

    }).then((sucesso) => {
        res.json(sucesso)
        // console.log(sucesso)
    }).catch((error) => {
        res.json(error)
        console.log(error)
    })

}