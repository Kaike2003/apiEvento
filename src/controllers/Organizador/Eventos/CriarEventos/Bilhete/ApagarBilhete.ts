import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"
import { QueryParams } from "../../../../../validation"

export const ApagarBilhete = async (req: Request, res: Response) => {

    const { idEvento, idBilhete }: QueryParams = req.params


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento,
        }
    })

    const verificarIdBilheteExiste = await prisma.bilhete.findFirst({
        where: {
            id: idBilhete,
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdBilheteExiste?.id === idBilhete) {

            const evento = await prisma.evento.findFirst({
                where: {
                    id: idEvento,
                    bilhete: {
                        some: {
                            id: idBilhete
                        }
                    }
                },
                include: {
                    bilhete: {
                        where: {
                            id: idBilhete
                        }
                    }
                }

            }).then((sucesso) => {

                if (null === sucesso) {
                    // res.json(sucesso)
                    res.json("Não pode excluir um bilhete. Que não tenha um relacionamento com um evento.")
                } else {

                    const apagarBilhete = prisma.bilhete.delete({
                        where: {
                            id: idBilhete
                        }
                    }).then((sucesso) => {
                        res.json({ "Bilhete apagado com sucesso": sucesso })
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
                "Verifique o Id do bilhete": idBilhete
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }

}