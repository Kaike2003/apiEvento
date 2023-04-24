import { Request, Response } from "express";
import { prisma } from "../../prisma";


export const ListarTodosUsuarios = async (req: Request, res: Response) => {


    const listarTodosUsuarios = await prisma.utilizador.findMany()
        .then(
            async (sucesso) => {
                res.json(sucesso)
                console.log(sucesso)
            }).catch((error) => {
                res.json(error)
            })

}