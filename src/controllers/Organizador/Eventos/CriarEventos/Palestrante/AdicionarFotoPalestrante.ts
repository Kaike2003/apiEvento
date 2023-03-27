import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";


export const AdicionarFotoPalestrante = async (req: Request, res: Response) => {

    const { id, idPalestrante } = req.params
    const idEvento: number = Number(id)
    const idFotoPalestrante: number = Number(idPalestrante)
    const foto = req.file?.filename


    try {
        const verificarIdEventoExiste = await prisma.evento.findFirst({
            where: {
                id: idEvento
            }
        })

        const verificarIdPalestrante = await prisma.evento.findFirst({
            where: {
                id: idFotoPalestrante
            }
        })

        if (verificarIdEventoExiste?.id === idEvento && verificarIdPalestrante?.id === idFotoPalestrante) {

            const adicionarFotoEvento = await prisma.palestrante.update({
                where: {
                    id: idFotoPalestrante
                }, data: {
                    foto: foto
                }
            })

            res.json({
                "Nome da foto do evento": foto,
                "Id existe palestrante": idFotoPalestrante,
                "Id existe evento": idEvento,

            })

        } else {

            res.json({
                "Nome da foto do evento": foto,
                "Id não existe palestrante": idFotoPalestrante,
                "Id não existe evento": idEvento,
            })

        }

    } catch (error) {
        res.json({ "Verifique os campos que estás mando {params, file ou body}": error })
    }

}