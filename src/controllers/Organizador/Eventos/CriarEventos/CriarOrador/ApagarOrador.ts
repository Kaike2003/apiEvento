import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";


export const ApagarOrador  = async (req: Request, res: Response) => {

    const { id } = req.params
    const idNumber = Number(id)
    try {

        if (idNumber >= 1) {
            const ApagarOrador  = await prisma.orador.delete({
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

        } else {
            res.status(400).json(`${idNumber} é inválido`)
        }

    } catch (error: any) {
        res.status(200).json(error)

    }

}