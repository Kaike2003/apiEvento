import { Evento, Utilizador } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma";
import { QueryParams } from "../../../../validation";

export const PublicarEvento = async (req: Request, res: Response) => {

    const { idEvento, idUtilizador }: QueryParams = req.params



    const verificarIdEventoExiste: Evento | null = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdUtilizadorExiste: Utilizador | null = await prisma.utilizador.findFirst({
        where: {
            id: idUtilizador,
            evento: {
                some: {
                    id: idEvento
                }
            }
        }
    })


    try {

        if (
            verificarIdEventoExiste?.id === idEvento
            &&
            verificarIdUtilizadorExiste?.id === idUtilizador
            &&
            verificarIdUtilizadorExiste.utilizador === "ORGANIZADOR"
        ) {

            if (verificarIdEventoExiste.publicado === false) {
                const adicionarFotoEvento = await prisma.evento.update({
                    where: {
                        id: idEvento
                    }, data: {
                        publicado: true
                    }
                }).then(() => {
                    res.status(201).json(`Evento ${idEvento} publicado com sucesso do evento`)
                }).catch((error) => {
                    res.status(400).json(error)
                })

                // res.json(`Evento ${idEvento} publicado com sucesso do evento`)
            } else {
                res.status(400).json(idEvento)
                console.log("Aviso Esse evento já foi publicado", idEvento)
            }
        } else {

            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o id do utilizador": idUtilizador
            })
        }

    } catch (error) {
        res.json({ "Verifique os campos que estás mando {params, file ou body}": error })
    }















    // const verificarIdEventoExiste: Evento | null = await prisma.evento.findFirst({
    //     where: {
    //         id: idEvento
    //     }
    // })

    // const verificarIdUtilizadorExiste: Utilizador | null = await prisma.utilizador.findFirst({
    //     where: {
    //         id: idUtilizador,
    //         evento: {
    //             some: {
    //                 id: idEvento
    //             }
    //         }
    //     },
    //      include: {
    //         evento: {
    //             where: {
    //                 id: idEvento
    //             }
    //         }
    //     }
    // })


    // try {

    //     if (
    //         verificarIdEventoExiste?.id === idEvento
    //         &&
    //         verificarIdUtilizadorExiste?.id === idUtilizador
    //         &&
    //         verificarIdUtilizadorExiste.utilizador === "ORGANIZADOR"
    //     ) {

    //         if (verificarIdEventoExiste.publicado === false) {
    //             const adicionarFotoEvento = await prisma.evento.update({
    //                 where: {
    //                     id: idEvento
    //                 }, data: {
    //                     publicado: true
    //                 }
    //             })

    //             res.json(`Evento ${idEvento} publicado com sucesso do evento`)
    //         } else {
    //             res.json({ "[Aviso!] Esse evento já foi publico": idEvento })
    //         }

    //     } else {

    //         res.json({ "Id não existe": idEvento })
    //     }

    // } catch (error) {
    //     res.json({ "Verifique os campos que estás mando {params, file ou body}": error })
    // }

}