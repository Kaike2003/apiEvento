import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const Organizador = async (req: Request, res: Response) => {

    try {


        const listartodosOrganizadores = prisma.utilizador.findMany({
            where: {
                utilizador: "ORGANIZADOR"
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