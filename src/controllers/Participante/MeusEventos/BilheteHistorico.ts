import { Request, Response } from "express";
import { QueryParams } from "../../../validation";
import { prisma } from "../../../prisma";


export const BilheteHistorico = async (req: Request, res: Response) => {


    const { idUtilizador }: QueryParams = req.params


    const verificarUtilizador = await prisma.utilizador.findFirst({
        where: {
            id: idUtilizador,
            compra: {
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

            // res.json(sucesso.id)


            const historicoBilhete = await prisma.compra.findMany({
                where: {
                    utilizadorId: sucesso.id,
                    pagamento: true
                },

                include: {
                    item_Bilhte: {
                        where: {
                            compra: {
                                utilizadorId: sucesso.id,
                            }
                        }
                        ,
                        include: {
                            bilhete: {
                                select: {
                                    id: true,
                                    eventoId: true
                                }
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