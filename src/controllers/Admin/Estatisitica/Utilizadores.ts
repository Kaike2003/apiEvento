import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const EstatisticaUtilizador = async (req: Request, res: Response) => {


    try {

        const utilizadores = await prisma.utilizador.count()
            .then(async sucessoUtilizadores => {

                res.json(sucessoUtilizadores)

            }).catch(error => {
                res.status(400).json(error)
                console.log(error)
            })

    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }

}