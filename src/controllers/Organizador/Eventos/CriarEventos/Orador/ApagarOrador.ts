import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"
import { QueryParams } from "../../../../../validation"

export const ApagarOrador = async (req: Request, res: Response) => {

    const { idEvento, idOrador }: QueryParams = req.params

    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdOradorExiste = await prisma.orador.findFirst({
        where: {
            id: idOrador
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdOradorExiste?.id === idOrador) {

            const apagarRelacaoOradorID = await prisma.orador_Evento.delete({
                where: {
                    oradorId_eventoId: {
                        oradorId: idOrador,
                        eventoId: idEvento
                    }
                }
            }).then((sucesso) => {

                try {
                    const apagarOrador = prisma.orador.delete({
                        where: {
                            id: idOrador,
                        }
                    }).then((sucesso) => {
                        res.status(201).json({ "Orador apagado com sucesso": sucesso })
                    }).catch((error) => {
                        res.status(400).json({ "Erro ao tentar apagar o palestrante": error })
                    })
                } catch (error) {
                    res.json(error)
                }

            }).catch((error) => {
                res.json({
                    error: {
                        "code": "P2025",
                        "clientVersion": "4.8.0",
                        "meta": {
                            "cause": "O registro a ser excluído não existe."
                        }
                    }
                })
            })

        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do orador": idOrador
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }


}