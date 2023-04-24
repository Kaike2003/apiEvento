import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const ListarPagamentos = async (req: Request, res: Response) => {


    const aprovarPagamento = await prisma.compra.findMany({
        where: {
            pagamento: false
        }
    }).then(async (sucesso) => {
        res.json(sucesso)
        console.log(sucesso)
    }).catch((error) => {
        res.json(error)
        console.log(error)
    })


}