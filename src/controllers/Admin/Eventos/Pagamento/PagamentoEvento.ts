import { Request, Response } from "express";
import { prisma } from "../../../../prisma";

export const PagamentoEvento = async (req: Request, res: Response) => {

    await prisma.evento.findMany({
        where: {
            pagamento: false,
            estado: "FINALIZADO"
        },
        include: {
            bilhete: {
                select: {
                    eventoId: true,
                    quantidade: true,
                    preco: true,
                },
            }
        }
    }).then(sucesso => {
        res.json(sucesso)
    }).catch(error => {
        res.json(error)
    })

}