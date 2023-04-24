import { Utilizador } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma";
import { QueryParams } from "../../../../validation";


export const ListarEventos = async (req: Request, res: Response) => {



    const { idUtilizador }: QueryParams = req.params

    const verificarIdUtilizadorExiste: Utilizador | null = await prisma.utilizador.findFirst({
        where: {
            id: idUtilizador
        }
    })

    console.log("Id do utilizador", idUtilizador)


    try {
        if (verificarIdUtilizadorExiste?.id === idUtilizador &&
            verificarIdUtilizadorExiste.utilizador === "ORGANIZADOR") {


            // const listarEvento = await prisma.utilizador.findMany({
            //     select: {
            //         evento: {
            //             where: {
            //                 utilizadorId: idUtilizador,
            //             },
            //             select: {
            //                 nome: true,
            //                 dataInicio: true,
            //                 dataTermino: true
            //             }
            //         }
            //     }

            // })

            const listarEvento = await prisma.evento.findMany({
                where: {
                    utilizador: { id: idUtilizador }
                },
                orderBy:{
                    at_create: "desc"
                }
            }).then((sucesso) => {
                res.status(200).json(sucesso)
                console.log(sucesso)
            }).catch((error: any) => {
                res.status(400).json(error)
            })


        } else {
            res.status(400).json({
                "Verifique o id do utilizador": idUtilizador
            })
        }

    } catch (error) {
        res.status(400).json(error)
    }



}