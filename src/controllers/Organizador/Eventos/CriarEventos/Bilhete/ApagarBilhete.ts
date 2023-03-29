import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"

export const ApagarBilhete = async (req: Request, res: Response) => {

    const { id, idBilhete } = req.params
    const idEvento: string = String(id)
    const idBilheteApagar: string = String(idBilhete)


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento,
        }
    })

    const verificarIdBilheteExiste = await prisma.bilhete.findFirst({
        where: {
            id: idBilheteApagar
        }
    })


    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdBilheteExiste?.id === idBilheteApagar) {


            const evento = await prisma.evento.findFirst({
                where: {
                    id: idEvento,
                    bilhete: {
                        every: {
                            id: idBilheteApagar
                        }
                    }
                },
                include: {
                    bilhete: {
                        where: {
                            id: idBilheteApagar
                        }
                    }
                }

            }).then((sucesso) => {

                if (null === sucesso) {
                    res.json("Não pode excluir um bilhete. Que não tenha um relacionamento com um evento.")
                } else {

                    const apagarBilhete = prisma.bilhete.delete({
                        where: {
                            id: idBilheteApagar
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
                "Verifique o Id do bilhete": idBilheteApagar
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }

}