import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
prisma

export const AtualizarBilhete = async (req: Request, res: Response) => {



    const { id, idBilhete } = req.params
    const idEvento: string = String(id)
    const idBilheteAtualizar: string = String(idBilhete)

    const {
        nome,
        preco,
        horaInicio,
        horaTermino,
        dataInicio,
        dataTermino,
        quantidade,
        tipoEvento
    } = req.body

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


            const evento = await prisma.bilhete.findFirst({
                where: {
                    id: idBilheteAtualizar,
                    evento: {
                        id: idEvento
                    }
                },
                include: {
                    // bilhete: {
                    //     where: {
                    //         id: idBilheteAtualizar
                    //     }
                    // }

                    evento: {
                        select: {
                            bilhete: {
                                where: {
                                    id: idBilheteAtualizar
                                }
                            }
                        }
                    }
                }

            }).then((sucesso) => {

                // res.json({ sucesso, idEvento, idBilheteAtualizar })

                if (null === sucesso) {
                    res.json("Não pode atualizar um bilhete. Que não tenha um relacionamento com um evento.")
                } else {

                    const atualizarBilhete = prisma.bilhete.update({
                        where: {
                            id: idBilheteAtualizar
                        },
                        data: {
                            nome: nome,
                            preco: preco,
                            horaInicio: new Date(`${dataInicio} ${horaInicio}`),
                            horaTermino: new Date(`${dataTermino} ${horaTermino}`),
                            dataInicio: new Date(dataInicio),
                            dataTermino: new Date(dataTermino),
                            quantidade: quantidade,
                            tipoEvento: {
                                connect: {
                                    id: tipoEvento
                                }
                            },
                            evento: {
                                connect: {
                                    id: (idEvento)
                                }
                            }
                        }
                    }).then((sucesso) => {
                        res.json({ "Bilhete atualizado com sucesso": sucesso })
                    }).catch((error) => {
                        res.json(error)
                    })

                }

            }).catch((error) => {
                res.json(error)
            })


        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do bilhete": idBilheteAtualizar
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }

}