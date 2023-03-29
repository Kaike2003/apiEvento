import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const VisualiarPalestrante = async (req: Request, res: Response) => {

    const { idEvento } = req.params

    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })


    try {

        if (!verificarIdEventoExiste) {

            res.json("Valor nulo kk")

        } else {

            if (verificarIdEventoExiste.id === idEvento) {
                // res.json("Tudo funcionando")

                const listarPalestranteDeumEvento = await prisma.evento.findFirst({
                    where: {
                        id: idEvento
                    },
                    select: {
                        palestrante: {
                            include: {
                                palestrante: {
                                    select: {
                                        id: true,
                                        nome: true
                                    }
                                }
                            }
                        }
                    }
                }).then((sucesso) => {
                    res.json({ "Lista de palestrante ": sucesso })
                }).catch((error) => {
                    res.json(error)
                })


            } else {
                res.json("Erro!")
            }

        }

    } catch (error) {
        res.json({ "Visualizar palestrante": error })
    }
}