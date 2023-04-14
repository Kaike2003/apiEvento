import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const EventosTodosVermais = async (req: Request, res: Response) => {


    const listarTodosEventos = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: true,
        }

    }).then((sucesso) => {
        res.json(sucesso)
    }).catch((error) => {
        res.json({ "Erro listar todos participantes": error })
    })

}