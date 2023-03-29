import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"

export const ApagarOrador = async (req: Request, res: Response) => {

    const { id, idOrador } = req.params
    const idEvento: string = String(id)
    const idOradorApagar: string = String(idOrador)


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdOradorExiste = await prisma.palestrante.findFirst({
        where: {
            id: idOradorApagar
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdOradorExiste?.id === idOradorApagar) {

            const apagarRelacaoOradorID = await prisma.orador_Evento.delete({
                where: {
                    oradorId_eventoId: {
                        oradorId: idOradorApagar,
                        eventoId: idEvento
                    }
                }
            }).then((sucesso) => {

                try {
                    const apagarPalestrante = prisma.orador.delete({
                        where: {
                            id: idOradorApagar,
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
                "Verifique o Id do orador": idOradorApagar
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }


}