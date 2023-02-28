import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const ListarCategoria = async (req: Request, res: Response) => {

    try {
        const listarCateogirias = await prisma.categoria.findMany({
            select: {
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