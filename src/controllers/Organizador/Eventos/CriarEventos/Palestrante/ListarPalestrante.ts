import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";


export const ListarPalestrante = async (req: Request, res: Response) => {



    const { id } = req.params
    const idEvento: number = Number(id)


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })


    try {
        if (verificarIdEventoExiste?.id === idEvento) {


            const listarPalestrante = await prisma.evento.findMany({

                select: {
                    palestrante: {
                        select: {
                            palestrante: {
                                select: {
                                    nome: true,
                                    foto: true,
                                    blog: true
                                }
                            }
                        },
                        where: {
                            evento: {
                                id: idEvento
                            }
                        }
                    }
                }
            }).then((sucesso) => {
                res.status(200).json({ "Palestrantes": sucesso })
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