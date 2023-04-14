import { Request, Response } from "express"
import { prisma } from "../../../../prisma"


export const ListarTodasCategoria = async (req: Request, res: Response) => {


    const listarTodasCategoria = await prisma.categoria.findMany().then((sucesso) => {
        res.json(sucesso)
        // console.log(sucesso)
    }).catch((error) => {
        res.json(error)
        console.log(error)
    })

}