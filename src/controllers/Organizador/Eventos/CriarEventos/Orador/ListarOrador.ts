import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
import { QueryParams } from "../../../../../validation";


export const ListarOrador = async (req: Request, res: Response) => {



    const { idEvento }: QueryParams = req.params


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })


    try {
        if (verificarIdEventoExiste?.id === idEvento) {


            const listarPalestrante = await prisma.evento.findMany({

                select: {
                    orador: {
                        where: {
                            evento: {
                                id: idEvento
                            }
                        },
                        select: {
                            orador: {
                                select: {
                                    nome: true
                                }
                            }
                        }
                    }
                }


            }).then((sucesso) => {
                res.status(200).json({ "Oradores": sucesso })
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