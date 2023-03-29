import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { CategoriaOmit, CategoriaType } from "../../../validation";


export const CriarCategoria = async (req: Request, res: Response) => {

    const { nome }: CategoriaType = req.body

    const result = CategoriaOmit.parse({
        nome: nome
    })

    try {

        const existe = await prisma.categoria.findFirst({
            where: {
                nome: nome
            }, select: {
                nome: true
            }
        })

        if (existe?.nome === result.nome) {
            res.json("Esse valor já existe")
        } else {
            const criarCategoria = await prisma.categoria.create({
                data: {
                    nome: result.nome
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