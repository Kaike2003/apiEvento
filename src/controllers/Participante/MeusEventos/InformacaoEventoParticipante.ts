import { Request, Response } from "express"
import { QueryParams } from "../../../validation"
import { prisma } from "../../../prisma"


export const InformacaoEventoParticipante = async (req: Request, res: Response) => {


    const { idBilhete, idUtilizador }: QueryParams = req.params

    const verificarUtilizador = await prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    }).then(async (sucessoUtilizador) => {

        if (!sucessoUtilizador) {
            res.status(400).json("Id nulo utilizador")
        } else {

            const VerificarBilhete = await prisma.bilhete.findFirst({
                where: {
                    id: idBilhete
                }
            }).then(async (sucessoBilhete) => {

                if (!sucessoBilhete) {
                    res.status(400).json("Id nulo bilhete")
                } else {

                    await prisma.evento.findFirst({
                        where: {
                            bilhete: {
                                some: {
                                    evento: {
                                        id: sucessoBilhete.eventoId
                                    }
                                }
                            }
                        }
                    }).then((sucessoEvento) => {

                        if (!sucessoEvento) {
                            res.status(400).json(("Valor nulo evento"))
                        } else {
                            res.json(sucessoEvento)
                            console.log(sucessoEvento)
                        }

                    }).catch((error) => {
                        res.status(400).json(error)
                        console.log(error)
                    })
                }

            }).catch((error) => {
                res.status(400).json(error)
                console.log(error)
            })


        }

    }).catch((error) => {
        res.status(400).json(error)
        console.log(error)
    })

}