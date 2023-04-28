import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const EventosNovosVermais = async (req: Request, res: Response) => {

    const listarEventosNovos = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: true,
            OR: [
                { estado: "DESPONIVEL" },
                { estado: "ADECORRER" },
                { estado: "CANCELADO" }
            ]
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
            at_create: "desc"
        }

    }).then((sucesso) => {
        res.json(sucesso)
        console.log("Todos eventos novos", sucesso)
    }).catch((error) => {
        res.json({ "Erro listar todos participantes": error })
    })

}