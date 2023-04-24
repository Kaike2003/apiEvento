import { Request, Response } from "express";
import { QueryParams } from "../../../validation";
import { prisma } from "../../../prisma";


export const Historico = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params


    const verificarUtilizador = await prisma.bilhete.findMany({
        where: {
            item_bilhete: {
                every: {
                    compra: {
                        utilizadorId: idUtilizador,
                        pagamento: true
                       
                    }
                }
            }
        },
        include: {
            evento: {
                include: {
                    bilhete: {
                        where: {
                            item_bilhete: {
                                every: {
                                    compra: {
                                        utilizadorId: idUtilizador,
                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }).then(async (sucesso) => {
        res.json(sucesso)
    }).catch((error) => {
        res.json(error)
    })
}