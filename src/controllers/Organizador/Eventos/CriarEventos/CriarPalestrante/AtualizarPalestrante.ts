import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
import { PalestranteType, PalestranteOmit } from "../../../../../validation";


export const AtualizarPalestrante  = async (req: Request, res: Response) => {

    const { id } = req.params
    const { nome, blog }: PalestranteType = req.body
    const idNumber: number = Number(id)
    try {

        const result = PalestranteOmit.parse({
            nome: nome,
            blog: blog
        })

        if (idNumber >= 1) {
            const atualizarTipoBilhete  = await prisma.palestrante.update({
                where: {
                    id: idNumber
                }, data: {
                    nome: result.nome,
                    blog: result.blog
                }
            }).then((sucesso) => {
                res.status(200).json(sucesso)
            }).catch((error: any)=>{
                res.status(400).json(error)
            })

        } else {
            res.status(400).json(`${idNumber} é inválido`)
            console.log(`${idNumber} é inválido`)
        }

    } catch (error: any) {
        res.status(400).json(error)
    }



}