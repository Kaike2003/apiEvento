import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const EventosTodosLimiteVermais = async (req: Request, res: Response) => {

    const { limite } = req.query
    const limitedeEvento: number = Number(limite)
    console.log(limite)

    const listarEventosTodosLimite = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: true,
        },
        take: Number(limitedeEvento)

    }).then((sucesso) => {
        res.json(sucesso)
    }).catch((error) => {
        res.json({ "Erro listar todos participantes": error })
    })

}