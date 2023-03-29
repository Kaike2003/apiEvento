import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { CategoriaType, CategoriaOmit } from "../../../validation";


export const AtualizarCategoria = async (req: Request, res: Response) => {

    const { id } = req.params
    const { nome }: CategoriaType = req.body
    const idNumber: string = String(id)
    try {

        const result = CategoriaOmit.parse({
            nome: nome
        })

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

     

    } catch (error: any) {
        res.status(400).json(error)
    }



}