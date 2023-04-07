import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const ListarTipoBilhete  = async (req: Request, res: Response) => {

    try {
        const listarTipoBilhete = await prisma.tipoBilhete.findMany({
            select: {
                id: true,
                nome: true
            }
        }).then((sucesso) => {
            res.status(200).json(sucesso)
        }).catch((error: any) => {
            res.status(400).json(error)
        })
    } catch (error: any) {
        res.status(400).json(error)
    }

}