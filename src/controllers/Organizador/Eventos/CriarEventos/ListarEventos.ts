import { Request, Response } from "express";
import { prisma } from "../../../../prisma";


export const ListarEventos = async (req: Request, res: Response) => {


    const listarEventos = await prisma.evento.findMany().then((sucesso) => {
        res.status(201).json({ "Eventos cadastrados": sucesso })
    }).catch((error: any) => {
        res.status(400).json({ "Error lista de eventos": error })
    })


}