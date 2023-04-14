import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const EventosNovosVermais = async (req: Request, res: Response) => {

    const listarEventosNovos = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: true,
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