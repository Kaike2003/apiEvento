import { Request, Response } from "express";
import { prisma } from "../../../../prisma";

export const EventoPago = async (req: Request, res: Response) => {

    type Evento = {
        idEvento?: string
    }

    const { idEvento }: Evento = req.params


    await prisma.evento.findUnique({
        where: {
            id: idEvento
        }
    }).then(async (sucesso) => {

        await prisma.evento.update({
            where: {
                id: idEvento
            },
            data: {
                pagamento: true
            }
        }).then((sucessoPago) => {


            res.json(sucessoPago)

        }).catch(error => {
            res.json(error)
        })

    })

}