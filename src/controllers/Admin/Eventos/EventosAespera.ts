import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { QueryParams } from "../../../validation";

export const EventosAespera = async (req: Request, res: Response) => {

    const eventosAespera = await prisma.evento.findMany({
        where: {
            aprovado: false,
            publicado: true,
            banido: false
        },
        select:{
            nome: true,
            id: true,
            dataInicio: true,
            dataTermino: true,
            utilizadorId: true,
            
        }
    }).then((sucesso) => {
        res.status(200).json(sucesso)
    }).catch((error) => {
        res.status(400).json({ "Erro eventos aprovados": error })
    })


}