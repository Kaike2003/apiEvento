import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
prisma

export const AtualizarBilhete = async (req: Request, res: Response) => {



    const { id, idBilhete } = req.params
    const idEvento: number = Number(id)
    const idBilheteAtualizar: number = Number(idBilhete)

    const { nome, quantidade, preco, dataInicio, dataTermino, tipoEvento } = req.body


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdBilheteExiste = await prisma.bilhete.findFirst({
        where: {
            id: idBilheteAtualizar
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdBilheteExiste?.id === idBilheteAtualizar) {


            const atualizarBilhete = await prisma.bilhete.update({
                where: {
                    id: idBilheteAtualizar
                },
                data: {
                    nome: nome,
                    preco: preco,
                    dataInicio: new Date(dataInicio),
                    dataTermino: new Date(dataTermino),
                    quantidade: quantidade,
                    tipoEvento: {
                        connect: {
                            id: Number(tipoEvento)
                        }
                    },
                    evento: {
                        connect: {
                            id: (idEvento)
                        }
                    }
                }
            }).then((sucesso) => {
                res.status(200).json({ "Sucesso": sucesso })
            }).catch((error) => {
                res.json({ "Erro atualizar orador": error })
            })



        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do orador": idBilheteAtualizar
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }



}