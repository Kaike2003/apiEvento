import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";



export const ListarOradores  = async (req: Request, res: Response) => {

    try {
        const listarOradores = await prisma.orador.findMany({
            select: {
                nome: true
            }
        }).then((sucesso) => {
            res.status(200).json({"Oradores": sucesso})
        }).catch((error: any) => {
            res.status(400).json(error)
        })
    } catch (error: any) {
        res.status(400).json(error)
    }

}