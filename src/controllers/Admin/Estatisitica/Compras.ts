import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const EstatisticaCompra = async (req: Request, res: Response) => {

    try {

        const eventosPublicados = await prisma.compra.count({
            where: {
                pagamento: true
            }
        }).then(async sucessoCompra => {
            res.json(sucessoCompra)
        }).catch(error => {
            res.status(400).json(error)
            console.log(error)
        })

    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }

}