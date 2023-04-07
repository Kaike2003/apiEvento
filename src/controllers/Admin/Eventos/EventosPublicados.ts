import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const EventosPublicados = async (req: Request, res: Response) => {

    const eventosPublicados = await prisma.evento.findMany({
        where: {
            publicado: true,
            aprovado: true,
            banido: false
        },
        select:{
            nome: true,
            id: true,
            dataInicio: true,
            dataTermino: true
        }
    }).then((sucesso) => {
        res.status(200).json(sucesso)
    }).catch((error) => {
        res.status(400).json({ "Erro eventos publicados": error })
    })

}