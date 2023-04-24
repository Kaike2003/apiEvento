import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const PagamentosAprovados = async (req: Request, res: Response) => {


    const pagamentosAprovados = await prisma.compra.findMany({
        where: {
            pagamento: true
        }
    }).then(async (sucesso) => {
        res.json(sucesso)
        console.log(sucesso)
    }).catch((error) => {
        res.json(error)
        console.log(error)
    })


}