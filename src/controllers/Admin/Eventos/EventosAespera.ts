import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { QueryParams } from "../../../validation";

export const EventosAespera = async (req: Request, res: Response) => {

    const eventosAespera = await prisma.evento.findMany({
        where: {
            aprovado: false,
            publicado: true,
            banido: false
        }
    }).then((sucesso) => {
        res.status(200).json({ "Eventos a espera de serem aprovados": sucesso })
    }).catch((error) => {
        res.status(400).json({ "Erro eventos aprovados": error })
    })


}