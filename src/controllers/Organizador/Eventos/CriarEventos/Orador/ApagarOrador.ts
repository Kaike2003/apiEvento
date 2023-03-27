import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"

export const ApagarOrador = async (req: Request, res: Response) => {

    const { id, idOrador } = req.params
    const idEvento: number = Number(id)
    const idOradorApagar: number = Number(idOrador)


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdOradorExiste = await prisma.orador.findFirst({
        where: {
            id: idOradorApagar
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdOradorExiste?.id === idOradorApagar) {


            const apagarRelacaoPalestranteID = await prisma.orador_Evento.delete({
                where: {
                    oradorId_eventoId: {
                        eventoId: idEvento,
                        oradorId: idOradorApagar
                    }
                }
            }).then((sucesso) => {

                const apagarPalestrante = prisma.orador.delete({
                    where: {
                        id: idOradorApagar,
                    }
                }).then((sucesso) => {
                    res.status(201).json({ "Orador id": idOradorApagar })
                }).catch((error) => {
                    res.status(400).json({ "Erro orador": error })
                })

            }).catch((error) => {
                res.json({ "Erro oradoriD e eventoId": error })
            })




        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do orador": idOradorApagar
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }

}