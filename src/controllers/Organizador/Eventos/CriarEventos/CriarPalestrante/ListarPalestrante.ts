import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";



export const ListarPalestrante  = async (req: Request, res: Response) => {

    try {
        const listarPalestrante = await prisma.palestrante.findMany({
            select: {
                nome: true,
                blog: true
            }
        }).then((sucesso) => {
            res.status(200).json({"Palestrantes": sucesso})
        }).catch((error: any) => {
            res.status(400).json(error)
        })
    } catch (error: any) {
        res.status(400).json(error)
    }

}