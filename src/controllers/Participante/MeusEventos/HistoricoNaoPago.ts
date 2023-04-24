import { Request, Response } from "express";
import { QueryParams } from "../../../validation";
import { prisma } from "../../../prisma";


export const HistoricoNaoPago = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params


    const verificarUtilizador = await prisma.compra.findMany({
        where: {
            utilizadorId: idUtilizador,
            pagamento: false
        }

    }).then(async (sucesso) => {
        res.json(sucesso)
    }).catch((error) => {
        res.json(error)
    })
}