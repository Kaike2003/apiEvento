import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
import { QueryParams } from "../../../../../validation";


export const ListarPalestrante = async (req: Request, res: Response) => {



    const { idEvento }: QueryParams = req.params

    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })


    try {
        if (verificarIdEventoExiste?.id === idEvento) {


            const listarPalestrante = await prisma.palestrante.findMany({
                where: {
                    evento: {
                        some: {
                            eventoId: idEvento
                        }
                    }
                }



            }).then((sucesso) => {
                res.status(200).json(sucesso)
            }).catch((error: any) => {
                res.status(400).json(error)
            })



        } else {
            res.status(400).json({
                "Verifique o id do evento": idEvento
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }



}