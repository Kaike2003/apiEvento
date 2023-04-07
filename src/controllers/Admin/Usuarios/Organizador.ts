import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const Organizador = async (req: Request, res: Response) => {

    try {


        const listartodosOrganizadores = prisma.utilizador.findMany({
            where: {
                utilizador: "ORGANIZADOR"
            },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                at_create: true,
                at_update: true
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