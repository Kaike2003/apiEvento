import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";


export const AdicionarFotoPalestrante = async (req: Request, res: Response) => {

    const { id, idPalestrante } = req.params
    const idEvento: string = String(id)
    const idFotoPalestrante: string = String(idPalestrante)
    const foto = req.file?.filename


    try {
        const verificarIdEventoExiste = await prisma.evento.findFirst({
            where: {
                id: idEvento
            }
        })

        const verificarIdPalestrante = await prisma.palestrante.findFirst
            ({
                where: {
                    id: idFotoPalestrante
                }
            })

        if (verificarIdEventoExiste?.id === idEvento && verificarIdPalestrante?.id === idFotoPalestrante) {

            const adicionarFotoPalestrante = await prisma.palestrante_Evento.update({
                where: {
                    palestranteId_eventoId: {
                        eventoId: verificarIdEventoExiste.id,
                        palestranteId: verificarIdPalestrante.id
                    }
                }, data: {
                    palestrante: {
                        update: {
                            foto: foto
                        }
                    }
                }
            }).then((sucesso) => {
                res.json({ "Foto adicionada com sucesso": sucesso })
            }).catch((error) => {
                res.json(error)
            })


        } else {

            res.json({
                "Verifique o id do evento": idEvento,
                "Verifique o id do palestrante": idFotoPalestrante
            })

        }

    } catch (error) {
        res.json({
            error: {
                "code": "P2025",
                "clientVersion": "4.8.0",
                "meta": {
                    "cause": "Nenhum registro 'Palestrante' foi encontrado para uma atualização aninhada na relação 'PalestranteToPalestrante_Evento'."
                }
            }
        })
    }

}