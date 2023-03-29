import { Evento } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma";

export const PublicarEvento = async (req: Request, res: Response) => {

    const { id } = req.params
    const idEvento: string = String(id)



    try {
        const verificarIdEventoExiste: Evento | null = await prisma.evento.findFirst({
            where: {
                id: idEvento
            }
        })

        if (verificarIdEventoExiste?.id === idEvento) {

            if (verificarIdEventoExiste.publicado === false) {
                const adicionarFotoEvento = await prisma.evento.update({
                    where: {
                        id: idEvento
                    }, data: {
                        publicado: true
                    }
                })

                res.json(`Evento ${idEvento} publicado com sucesso do evento`)
            } else {
                res.json({ "[Aviso!] Esse evento já foi publico": idEvento })
            }

        } else {

            res.json({ "Id não existe": idEvento })
        }

    } catch (error) {
        res.json({ "Verifique os campos que estás mando {params, file ou body}": error })
    }

}