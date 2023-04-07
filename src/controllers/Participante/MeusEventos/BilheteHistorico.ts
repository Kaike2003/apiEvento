import { Request, Response } from "express";
import { QueryParams } from "../../../validation";
import { prisma } from "../../../prisma";


export const BilheteHistorico = async (req: Request, res: Response) => {


    const { idUtilizador }: QueryParams = req.params


    const verificarUtilizador = await prisma.utilizador.findFirst({
        where: {
            id: idUtilizador,
            reserva: {
                every: {
                    utilizadorId: idUtilizador
                }
            }
        }

    }

    ).then(async (sucesso) => {


        if (!sucesso) {

            res.json("valor nulo")

        } else {

            const historicoBilhete = await prisma.reserva.findMany({
                where: {
                    utilizadorId: idUtilizador
                },
                include: {
                    item_Bilhte: {
                        where: {
                            reserva: {
                                utilizadorId: idUtilizador
                            }
                        }
                    }
                }
            }).then(async (sucessoHistoricoBilhete) => {
                res.json(sucessoHistoricoBilhete)
            }).catch((error) => {
                res.json(error)
            })

        }


    }).catch((error) => {
        res.json(error)
    })

}