import { Request, Response } from "express";
import { QueryParams } from "../../validation";
import { prisma } from "../../prisma";



export const AdicionarFofoParticipante = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params
    const foto = req.file?.filename

    console.log(idUtilizador)

    const verificarUtilizador = await prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    }).then(async sucesso => {

        await prisma.utilizador.update({
            where: {
                id: idUtilizador
            },
            data: {
                foto: String(foto)
            }
        }).then((sucesso) => {

            res.json(sucesso)


        }).catch((error) => {
            res.status(400).json(error)
        })

    }).catch(error => {
        res.status(400).json(error)
    })


}