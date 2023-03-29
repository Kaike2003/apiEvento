import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { TipoBilheteType, TipoBilheteOmit } from "../../../validation";


export const AtualizarTipoBilhete = async (req: Request, res: Response) => {

    const { id } = req.params
    const { nome }: TipoBilheteType = req.body
    const idNumber: string = String(id)
    try {

        const result = TipoBilheteOmit.parse({
            nome: nome
        })

        const atualizarTipoBilhete = await prisma.tipoBilhete.update({
            where: {
                id: idNumber
            }, data: {
                nome: result.nome
            }
        }).then((sucesso) => {
            res.status(200).json(sucesso)
        }).catch((error: any) => {
            res.status(400).json(error)
        })


    } catch (error: any) {
        res.status(400).json(error)
    }



}