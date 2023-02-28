import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { CategoriaType, CategoriaOmit } from "../../../validation";


export const AtualizarCategoria = async (req: Request, res: Response) => {

    const { id } = req.params
    const { nome }: CategoriaType = req.body
    const idNumber: number = Number(id)
    try {

        const result = CategoriaOmit.parse({
            nome: nome
        })

        if (idNumber >= 1) {
            const atualizarCategoria = await prisma.categoria.update({
                where: {
                    id: idNumber
                }, data: {
                    nome: result.nome
                }
            }).then((sucesso) => {
                res.status(200).json(sucesso)
            }).catch((error: any)=>{
                res.status(400).json(error)
            })

        } else {
            res.status(400).json(`${idNumber} é inválido`)
        }

    } catch (error: any) {
        res.status(400).json(error)
    }



}