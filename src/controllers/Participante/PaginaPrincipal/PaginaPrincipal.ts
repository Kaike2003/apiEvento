import { Request, Response } from "express"
import { prisma } from "../../../prisma"


export const PaginaPrincipalEventos = async (req: Request, res: Response) => {


    const paginaPrincipalEventos = await prisma.evento.findMany({
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
        take: 8

    }).then((sucesso) => {
        res.json(sucesso)
        // console.log(sucesso)
    }).catch((error) => {
        res.json(error)
        console.log(error)
    })

    

}