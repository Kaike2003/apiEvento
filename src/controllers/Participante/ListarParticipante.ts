import { Request, Response } from "express";
import { prisma } from "../../prisma";



export const ListarParticipante = async (req: Request, res: Response) => {

    const listarParticipantes = await prisma.utilizador.findMany()
        .then((sucesso) => {
            res.json(sucesso)
        }).catch((error) => {
            res.json(error)
        })

}