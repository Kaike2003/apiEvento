import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
import { PalestranteType, QueryParams } from "../../../../../validation";
prisma

export const AtualizarPalestrante = async (req: Request, res: Response) => {

    const { idEvento, idPalestrante } : QueryParams = req.params
  
    const { nome, blog } : PalestranteType = req.body



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

            const adicionarFotoPalestrante = await prisma.palestrante_Evento.update({
                where: {
                    palestranteId_eventoId: {
                        eventoId: verificarIdEventoExiste.id,
                        palestranteId: verificarIdPalestranteExiste.id
                    }
                }, data: {
                    palestrante: {
                        update: {
                            nome: nome,
                            blog: blog
                        }
                    }
                }
            }).then((sucesso) => {
                res.status(200).json({ "Atualização feita com sucesso": sucesso })
            }).catch((error) => {
                res.status(400).json(error)
            })


        } else {

            res.json({
                "Verifique o id do evento": idEvento,
                "Verifique o id do palestrante.": idPalestrante
            })

        }


    } catch (error) {
        res.status(400).json({
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