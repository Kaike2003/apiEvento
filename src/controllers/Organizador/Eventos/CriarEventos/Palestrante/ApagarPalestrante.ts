import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"
import { QueryParams } from "../../../../../validation"

export const ApagarPalestrante = async (req: Request, res: Response) => {

    const { idEvento, idPalestrante } : QueryParams = req.params
   


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdPalestranteExiste = await prisma.palestrante.findFirst({
        where: {
            id: idPalestrante
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdPalestranteExiste?.id === idPalestrante) {

            const apagarRelacaoPalestranteID = await prisma.palestrante_Evento.delete({
                where: {
                    palestranteId_eventoId: {
                        palestranteId: idPalestrante,
                        eventoId: idEvento
                    }
                }
            }).then((sucesso) => {

                try {
                    const apagarPalestrante = prisma.palestrante.delete({
                        where: {
                            id: idPalestrante,
                        }
                    }).then((sucesso) => {
                        res.status(201).json({ "Palestrante apagado com sucesso": sucesso })
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
                "Verifique o Id do palestrante": idPalestrante
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }

}