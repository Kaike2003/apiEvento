import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { QueryParams } from "../../../validation";




export const VisualizarEvento = async (req: Request, res: Response) => {



    const { idEvento }: QueryParams = req.params

    const verificarIdEventoExiste = await prisma.evento.findUnique({
        where: {
            id: idEvento
        }
    })

    try {


        if (!verificarIdEventoExiste) {

            res.json("Id nulo")

        } else {

            const exibirTodasInformacoesEvento = await prisma.evento.findFirst({
                where: {
                    id: idEvento
                },
                include: {
                    bilhete: {
                        select: {
                            id: true,
                            nome: true,
                            quantidade: true,
                            tipoEvento: true,
                            dataInicio: true,
                            dataTermino: true,
                            horaInicio: true,
                            horaTermino: true
                        },
                        where: {
                            eventoId: idEvento
                        }
                    },
                    orador: {
                        select: {
                            orador: {
                                select: {
                                    nome: true
                                }
                            }
                        },
                        where: {
                            eventoId: idEvento
                        }
                    }
                }

            }).then(async (sucesso) => {


                const eventoVisualizacao = await prisma.evento.findUnique({
                    where: {
                        id: idEvento
                    }
                }).then(async (sucesso) => {

                    if (!sucesso) {
                        res.json("Valor nulo")
                    } else {

                        const atualizarVisualizacao = await prisma.evento.update({
                            where: {
                                id: idEvento
                            },
                            data: {
                                visualizacao: sucesso.visualizacao + 1
                            }
                        })




                    }

                })

                res.json({ "Informações do evento": sucesso })
            }).catch((error) => {
                res.json(error)
            })



        }

    } catch (error) {

        res.json({ "Erro visualizar bilhete": error })

    }

}