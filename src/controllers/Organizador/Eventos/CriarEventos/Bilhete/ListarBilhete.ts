import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
import { QueryParams } from "../../../../../validation";


export const ListarBilhete = async (req: Request, res: Response) => {


    const { idEvento }: QueryParams = req.params


    const verificarIdEventoExiste = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    try {
        if (verificarIdEventoExiste?.id === idEvento) {


            const listarBilhete = await prisma.bilhete.findMany({
                where: {
                    eventoId: idEvento
                }


                // select: {
                //     bilhete: {
                //         where: {
                //             evento: {
                //                 id: idEvento
                //             }
                //         },
                //         select: {
                //             nome: true,
                //             preco: true,
                //             dataInicio: true,
                //             dataTermino: true,
                //             quantidade: true,
                //             tipoEvento: true,
                //         }
                //     }
                // }
            }).then((sucesso) => {
                res.status(200).json(sucesso)
                console.log("Bilhetes", sucesso)
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