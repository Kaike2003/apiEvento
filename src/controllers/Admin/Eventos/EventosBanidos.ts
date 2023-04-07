import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const EventosBanidos = async (req: Request, res: Response) => {

    try {

            const banirEvento = await prisma.evento.findMany({
                where: {
                    banido: true
                }
            }).then((sucesso) => {
                res.json(sucesso)
            }).catch((error) => {
                res.json(`Erro banir evento: ${error}`)
            })


    } catch (error) {
        res.json(error)
    }
}