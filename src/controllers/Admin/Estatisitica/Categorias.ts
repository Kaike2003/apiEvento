import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const EstatisticaCategorias = async (req: Request, res: Response) => {


    try {

        const categorias = await prisma.categoria.count()
            .then(async sucessoCategorias => {

                res.json(sucessoCategorias)

            }).catch(error => {
                res.status(400).json(error)
                console.log(error)
            })

    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }

}