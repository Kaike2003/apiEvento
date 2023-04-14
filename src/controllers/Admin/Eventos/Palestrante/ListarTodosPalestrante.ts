import { Request, Response } from "express"
import { prisma } from "../../../../prisma"


export const ListarTodosPalestrante = async (req: Request, res: Response) => {


    const listarTodosPalestrante = await prisma.palestrante.findMany().then(async (sucesso) => {

        res.json(sucesso)
        console.log(sucesso)


    }).catch((error) => {
        res.status(400).json(error)
        console.log(error)
    })



    // const listarTodasCategoria = await prisma.palestrante.findMany().then((sucesso) => {
    //     res.json(sucesso)
    //     // console.log(sucesso)
    // }).catch((error) => {
    //     res.status(400).json(error)
    //     console.log(error)
    // })

}