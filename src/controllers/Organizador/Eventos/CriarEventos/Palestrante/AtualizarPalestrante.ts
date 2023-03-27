import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
prisma

export const AtualizarPalestrante = async (req: Request, res: Response) => {



    const { id, idPalestrante } = req.params
    const idEvento: number = Number(id)
    const idPalestranteAtualizar: number = Number(idPalestrante)

    const { nome, blog } = req.body



    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdPalestranteExiste = await prisma.palestrante.findFirst({
        where: {
            id: idPalestranteAtualizar
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdPalestranteExiste?.id === idPalestranteAtualizar) {


            const atualizarPalestrante = await prisma.palestrante.update({
                where: {
                    id: Number(idPalestrante)
                },
                data: {
                    nome: nome,
                    blog: blog
                }
            }).then((sucesso) => {
                res.json({ "Sucesso": sucesso })
            }).catch((error) => {
                res.json({ "Erro atualizar palestrante": error })
            })



        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do palestrante": idPalestranteAtualizar
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }



}