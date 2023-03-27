import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"

export const ApagarBilhete = async (req: Request, res: Response) => {

    const { id, idBilhete } = req.params
    const idEvento: number = Number(id)
    const idBilheteApagar: number = Number(idBilhete)


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    const verificarIdBilheteExiste = await prisma.bilhete.findFirst({
        where: {
            id: idBilheteApagar
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento && verificarIdBilheteExiste?.id === idBilheteApagar) {


            // const apagarRelacaoPalestranteID = await prisma..delete({
            //     where: {
            //         oradorId_eventoId: {
            //             eventoId: idEvento,
            //             oradorId: idBilheteApagar
            //         }
            //     }
            // }).then((sucesso) => {

            const apagarBilhete = prisma.bilhete.delete({
                where: {
                    id: idBilheteApagar,
                }
            }).then((sucesso) => {
                res.status(201).json({ "Bilhete id": idBilheteApagar })
            }).catch((error) => {
                res.status(400).json({ "Erro orador": error })
            })

            // }).catch((error) => {
            //     res.json({ "Erro oradoriD e eventoId": error })
            // })




        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do orador": idBilheteApagar
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }

}