import { Request, Response } from "express";
import { prisma } from "../../../../prisma";

export const PagamentoEventoFeito = async (req: Request, res: Response) => {

    await prisma.evento.findMany({
        where: {
            pagamento: true,
            estado: "FINALIZADO"
        }
    }).then(sucesso => {
        res.json(sucesso)
    }).catch(error => {
        res.json(error)
    })

}