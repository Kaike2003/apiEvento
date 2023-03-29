import { Evento } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma";
import { QueryParams } from "../../../../validation";


export const AdicionarFotoEvento = async (req: Request, res: Response) => {

    const { idEvento, idUtilizador }: QueryParams = req.params
    const foto: string | undefined = req.file?.filename


    const verificarIdEventoExiste: Evento | null = await prisma.evento.findUnique({
        where: {
            id: idEvento
        }
    })


    try {

        if (verificarIdEventoExiste?.id === idEvento) {


            const evento = await prisma.utilizador.findFirst({
                where: {
                    id: idUtilizador,
                    evento: {
                        some: {
                            id: idEvento
                        }
                    }

                },
                // include: {
                //     evento: {
                //         where: {
                //             id: idEvento
                //         }
                //     }
                // }

            }).then((sucesso) => {


                if (null === sucesso) {
                    res.json("Não pode atualizar foto um evento. Que não tenha um relacionamento com um utilizador.")
                } else {

                    const adicionarFotoEvento = prisma.evento.update({
                        where: {
                            id: idEvento
                        }, data: {
                            foto: foto
                        }
                    })

                    res.json({
                        "Nome da foto do evento": foto,
                        "Id existe": idEvento,
                    })


                }

                // const adicionarFotoEvento = prisma.evento.update({
                //     where: {
                //         id: idEvento
                //     }, data: {
                //         foto: foto
                //     }
                // })

                // res.json({
                //     "Nome da foto do evento": foto,
                //     "Id existe": idEvento,
                // })

            }).catch((error) => {
                res.json({
                    "Não podes a tualizar a foto de um outro evento":
                        error
                })
            })


        } else {

            res.json({ "Id não existe": idEvento })
        }

    } catch (error) {
        res.json({ "Verifique os campos que estás mando {params, file ou body}": error })
    }
}