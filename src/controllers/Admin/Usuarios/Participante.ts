import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const Participante = async (req: Request, res: Response) => {

    try {

        const listartodosParticipantes = prisma.utilizador.findMany({
            where: {
                utilizador: "PARTICIPANTE"
            },
            select: {
                id: true,
                nome: true,
                email: true,
                banido: true,
                telefone: true,
                at_create: true,
                at_update: true,
            }
        }).then((sucesso) => {
            res.json(sucesso)
        }).catch((errror) => {
            res.json(errror)
        })

    } catch (error) {

        res.json(error)

    }



}