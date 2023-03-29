import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const ApagarCategoria = async (req: Request, res: Response) => {

    const { id } = req.params
    const idNumber = String(id)
    try {

        const ApagarCategoria = await prisma.categoria.delete({
            where: {
                id: idNumber
            }
        }).then((sucesso) => {
            res.status(200).json(sucesso)
        }).catch((error) => {
            res.status(400).json({
                error: {
                    "cause": "O registro a ser excluído não existe."
                }
            })
        })



    } catch (error: any) {
        res.status(200).json(error)

    }

}