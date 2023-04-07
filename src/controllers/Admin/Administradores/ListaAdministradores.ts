import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const ListaAdministradores = async (req: Request, res: Response) => {


    try {

        const listaAdmin = await prisma.utilizador.findMany({
            where: {
                utilizador: "ADMIN",    
            },
            select:{
                id: true,
                nome: true
            }
        }).then((sucesso) => {
            res.status(200).json(sucesso)
        }).catch((error: any) => {
            res.status(400).json(error)
        })

    } catch (error) {
        res.status(400).json(error)
    }

}