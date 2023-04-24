import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
import { QueryParams } from "../../../../../validation";


export const AdicionarFotoPalestrante = async (req: Request, res: Response) => {

    const { idEvento, idPalestrante }: QueryParams = req.params
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
                    id: idPalestrante
                }
            })

        if (verificarIdEventoExiste?.id === idEvento && verificarIdPalestrante?.id === idPalestrante) {

            const adicionarFotoPalestrante = await prisma.palestrante_Evento.update({
                where: {
                    palestranteId_eventoId: {
                        eventoId: verificarIdEventoExiste.id,
                        palestranteId: verificarIdPalestrante.id
                    }
                },
                data: {
                    palestrante: {
                        update: {
                            foto: String(foto)
                        }
                    }
                }
            }).then((sucesso) => {
                res.json(sucesso)
            }).catch((error) => {
                res.json({
                    error: {
                        "code": "P2025",
                        "clientVersion": "4.8.0",
                        "meta": {
                            "cause": "Nenhum registro 'Palestrante' foi encontrado para uma atualização aninhada na relação 'PalestranteToPalestrante_Evento'."
                        }
                    }
                })
            })


        } else {

            res.json({
                "Verifique o id do evento": idEvento,
                "Verifique o id do palestrante": idPalestrante
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