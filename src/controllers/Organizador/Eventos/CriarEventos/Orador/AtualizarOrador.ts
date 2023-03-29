import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
prisma

export const AtualizarOrador = async (req: Request, res: Response) => {



    const { id, idOrador } = req.params
    const idEvento: string = String(id)
    const idOradorAtualizar: string = String(idOrador)

    const { nome } = req.body

    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdOradorExiste = await prisma.orador.findFirst({
        where: {
            id: idOradorAtualizar
        }
    })


    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdOradorExiste?.id === idOradorAtualizar) {

            const atualizarOradorID = await prisma.orador_Evento.update({
                where: {
                    oradorId_eventoId: {
                        eventoId: verificarIdEventoExiste.id,
                        oradorId: verificarIdOradorExiste.id
                    }
                }, data: {
                    orador: {
                        update: {
                            nome: nome,
                        }
                    }
                }
            }).then((sucesso) => {
                res.status(200).json({ "Atualização feita com sucesso": sucesso })
            }).catch((error) => {
                res.status(400).json(error)
            })


        } else {

            res.json({
                "Verifique o id do evento": idEvento,
                "Verifique o id do palestrante.": idOradorAtualizar
            })

        }


    } catch (error) {
        res.status(400).json({
            error: {
                "code": "P2025",
                "clientVersion": "4.8.0",
                "meta": {
                    "cause": "Nenhum registro 'Orador' foi encontrado para uma atualização aninhada na relação 'OradorToOrador_Evento'."
                }
            }
        })
    }















    // const verificarIdEventoExiste = await prisma.evento.findFirst({
    //     where: {
    //         id: idEvento
    //     }
    // })

    // const verificarIdPalestranteExiste = await prisma.orador.findFirst({
    //     where: {
    //         id: idOradorAtualizar
    //     }
    // })

    // try {
    //     if (verificarIdEventoExiste?.id === idEvento && verificarIdPalestranteExiste?.id === idOradorAtualizar) {


    //         const atualizarPalestrante = await prisma.orador.update({
    //             where: {
    //                 id: idOradorAtualizar
    //             },
    //             data: {
    //                 nome: nome
    //             }
    //         }).then((sucesso) => {
    //             res.json({ "Sucesso": sucesso })
    //         }).catch((error) => {
    //             res.json({ "Erro atualizar orador": error })
    //         })



    //     } else {
    //         res.status(400).json({
    //             "Verifique o id do evento": idEvento,
    //             "Verifique o Id do orador": idOradorAtualizar
    //         })
    //     }

    // } catch (error) {
    //     res.status(400).json(error)
    // }



}