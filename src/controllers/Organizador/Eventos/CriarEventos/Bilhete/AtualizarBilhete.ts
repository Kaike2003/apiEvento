import { Bilhete, Evento } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
prisma
import { BilheteOmit, BilheteType, QueryParams } from "../../../../../validation"


export const AtualizarBilhete = async (req: Request, res: Response) => {



    const { idEvento, idBilhete }: QueryParams = req.params


    console.log(idEvento, idBilhete)

    const {
        nome,
        preco,
        horaInicio,
        horaTermino,
        dataInicio,
        dataTermino,
        quantidade,
        tipoEvento
    }: BilheteType = req.body

    const result = BilheteOmit.parse({
        nome: nome,
        preco: preco,
        quantidade: quantidade,
        tipoEvento: tipoEvento,
        dataInicio: new Date(dataInicio),
        dataTermino: new Date(dataTermino),
        horaInicio: new Date(`${dataInicio} ${horaInicio}`),
        horaTermino: new Date(`${dataTermino} ${horaTermino}`),
    })

    const valores_Req_Body: (String | Number | Date)[] = [nome,
        preco,
        horaInicio,
        horaTermino,
        dataInicio,
        dataTermino,
        quantidade,
        tipoEvento]

    const verificarIdEventoExiste: Evento | null = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdBilheteExiste: Bilhete | null = await prisma.bilhete.findFirst({
        where: {
            id: idBilhete
        }
    })



    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdBilheteExiste?.id === idBilhete) {


            const evento = await prisma.bilhete.findFirst({
                where: {
                    id: idBilhete,
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
                                    id: idBilhete
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


                    // if (
                    //     verificarIdEventoExiste.dataInicio.getDate() > (result).dataInicio.getDate()
                    //     &&
                    //     verificarIdEventoExiste.dataInicio.getDate() >= (result).dataTermino.getDate()
                    //     &&
                    //     verificarIdEventoExiste.dataInicio.getDate() !== (result).dataInicio.getDate()
                    //     && (result).dataTermino > (result).dataInicio
                    //     && (result).dataInicio.getMonth() <= verificarIdEventoExiste.dataInicio.getMonth()
                    //     && (result).dataTermino.getMonth() <= verificarIdEventoExiste.dataTermino.getMonth()
                    // ) {


                        const atualizarBilhete = prisma.bilhete.update({
                            where: {
                                id: idBilhete
                            },
                            data: {

                                nome: (result).nome,
                                preco: (result).preco,
                                horaInicio: (result).horaInicio,
                                horaTermino: (result).horaTermino,
                                dataInicio: (result).dataInicio,
                                dataTermino: (result).dataTermino,
                                quantidade: (result).quantidade,
                                tipoEvento: {
                                    connect: {
                                        id: (result).tipoEvento
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

                    // } else {
                    //     res.json({
                    //         "Possiveis erros": {
                    //             "Valores vindo do body": valores_Req_Body,
                    //             "Data inicio evento": `${verificarIdEventoExiste.dataInicio.getDate()}/${verificarIdEventoExiste.dataInicio.getMonth()}/${verificarIdEventoExiste.dataInicio.getFullYear()}`,
                    //             "Data termino evento": `${verificarIdEventoExiste.dataTermino.getDate()}/${verificarIdEventoExiste.dataTermino.getMonth()}/${verificarIdEventoExiste.dataTermino.getFullYear()}`,
                    //             "Data inicio bilhete": (result).dataInicio.getDate(),
                    //             "Data termino bilhete": (result).dataTermino.getDate(),

                    //             "Teste de validação": verificarIdEventoExiste.dataInicio.getDate() > (result).dataInicio.getDate()
                    //                 &&
                    //                 verificarIdEventoExiste.dataInicio.getDate() >= (result).dataTermino.getDate()
                    //                 &&
                    //                 verificarIdEventoExiste.dataInicio.getDate() !== (result).dataInicio.getDate()
                    //                 && (result).dataTermino > (result).dataInicio
                    //         }

                    //     })

                    // }

                  
                }

            }).catch((error) => {
                res.json(error)
            })


        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do bilhete": idBilhete
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }

}