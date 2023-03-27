import { Request, Response } from "express";
import { prisma } from "../../../../prisma";


export const AdicionarFotoEvento = async (req: Request, res: Response) => {

    const { id } = req.params
    const idEvento: number = Number(id)
    const foto = req.file?.filename


    try {
        const verificarIdEventoExiste = await prisma.evento.findFirst({
            where: {
                id: idEvento
            }
        })

        if (verificarIdEventoExiste?.id === idEvento) {

            const adicionarFotoEvento = await prisma.evento.update({
                where: {
                    id: idEvento
                }, data: {
                    foto: foto
                }
            })

            res.json({
                "Nome da foto do evento": foto,
                "Id existe": idEvento,
            })

        } else {

            res.json({ "Id não existe": idEvento })
        }

    } catch (error) {
        res.json({ "Verifique os campos que estás mando {params, file ou body}": error })
    }
}