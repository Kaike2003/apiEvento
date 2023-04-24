import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const EstatisticaEventosPublicados = async (req: Request, res: Response) => {

    try {

        const eventosPublicados = await prisma.evento.count({
            where: {
                publicado: true
            }
        }).then(async sucessoEventosPublicados => {
            res.json(sucessoEventosPublicados)
        }).catch(error => {
            res.status(400).json(error)
            console.log(error)
        })

    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }

}