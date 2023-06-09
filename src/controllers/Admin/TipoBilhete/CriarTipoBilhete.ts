import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { TipoBilheteOmit, TipoBilheteType } from "../../../validation";


export const CriarTipoBilhete = async (req: Request, res: Response) => {

    const { nome }: TipoBilheteType = req.body

    const result = TipoBilheteOmit.parse({
        nome: nome
    })

    try {

        const existe = await prisma.tipoBilhete.findFirst({
            where: {
                nome: nome
            }, select: {
                nome: true
            }
        })

        if (existe?.nome === result.nome.toLowerCase()) {
            res.status(400).json("Esse valor já existe")
        } else {
            const criarTipoBilhete = await prisma.tipoBilhete.create({
                data: {
                    nome: result.nome.toLowerCase()
                }
            }).then((sucesso) => {
                res.status(201).json(sucesso)
            }).catch((error) => {
                res.status(400).json(error)
            })
        }


    } catch (error) {
        res.status(400).json(error)
    }

}