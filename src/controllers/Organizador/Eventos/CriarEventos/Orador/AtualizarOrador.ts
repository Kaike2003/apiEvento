import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
prisma

export const AtualizarOrador = async (req: Request, res: Response) => {



    const { id, idOrador } = req.params
    const idEvento: number = Number(id)
    const idOradorAtualizar: number = Number(idOrador)

    const { nome, blog } = req.body



    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdPalestranteExiste = await prisma.palestrante.findFirst({
        where: {
            id: idOradorAtualizar
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdPalestranteExiste?.id === idOradorAtualizar) {


            const atualizarPalestrante = await prisma.orador.update({
                where: {
                    id: idOradorAtualizar
                },
                data: {
                    nome: nome
                }
            }).then((sucesso) => {
                res.json({ "Sucesso": sucesso })
            }).catch((error) => {
                res.json({ "Erro atualizar orador": error })
            })



        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do orador": idOradorAtualizar
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }



}