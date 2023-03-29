import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const BanirEventos = async (req: Request, res: Response) => {

    const { id } = req.params
    const idEvento: string = String(id)

    try {
        const verificarIdEventoExiste = await prisma.evento.findFirst({
            where: {
                id: idEvento
            }
        })

        if (verificarIdEventoExiste?.id === idEvento && verificarIdEventoExiste.banido === false) {


            const banirEvento = await prisma.evento.update({
                where: {
                    id: idEvento
                },
                data: {
                    banido: true
                }
            }).then((sucesso) => {
                res.json({ "O evento com id Foi banido com sucesso.": sucesso })
            }).catch((error) => {
                res.json(`Erro banir evento: ${error}`)
            })

        } else {


            res.json(`O evento com id ${idEvento} já foi banido`)


        }

    } catch (error) {
        res.json({ "Verifique os campos que estás mando {params, file ou body}": error })
    }
}