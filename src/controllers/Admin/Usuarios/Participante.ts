import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const Participante = async (req: Request, res: Response) => {

    try {

        const listartodosParticipantes = prisma.utilizador.findMany({
            where: {
                utilizador: "PARTICIPANTE"
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