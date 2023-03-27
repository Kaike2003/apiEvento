import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"

export const ApagarPalestrante = async (req: Request, res: Response) => {

    const { id, idPalestrante } = req.params
    const idEvento: number = Number(id)
    const idPalestranteApagar: number = Number(idPalestrante)


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdPalestranteExiste = await prisma.palestrante.findFirst({
        where: {
            id: idPalestranteApagar
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdPalestranteExiste?.id === idPalestranteApagar) {


            const apagarRelacaoPalestranteID = await prisma.palestrante_Evento.delete({
                where: {
                    palestranteId_eventoId: {
                        palestranteId: idPalestranteApagar,
                        eventoId: idEvento
                    }
                }
            }).then((sucesso) => {

                const apagarPalestrante = prisma.palestrante.delete({
                    where: {
                        id: idPalestranteApagar,
                    }
                }).then((sucesso) => {
                    res.status(201).json({ "Palestrante id": idPalestranteApagar })
                }).catch((error) => {
                    res.status(400).json({ "Erro palestrante": error })
                })

            }).catch((error) => {
                res.json({ "Erro palestranteId e eventoId": error })
            })




        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do palestrante": idPalestranteApagar
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }

}