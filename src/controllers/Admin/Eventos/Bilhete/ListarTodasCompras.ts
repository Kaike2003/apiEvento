import { Request, Response } from "express"
import { prisma } from "../../../../prisma"


export const ListarTodasComprasPagas = async (req: Request, res: Response) => {


    const listarTodasComprasPagas = await prisma.compra.findMany(
        {
            where: {
                pagamento: true
            }
        }
    ).then((sucesso) => {
        res.json(sucesso)
        console.log(sucesso)
    }).catch((error) => {
        res.json(error)
        console.log(error)
    })

}