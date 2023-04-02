import { Request, Response } from "express";
import { QueryParams } from "../../../validation";
import { prisma } from "../../../prisma";
import { Utilizador } from "@prisma/client";



export const VerificarContaParticipante = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params


    const aprovarUtilizador: Utilizador | null = await prisma.utilizador.findFirst({
        where: {
            id: idUtilizador
        }
    })


    try {
        console.log({ "VerificarConta": idUtilizador })


        if (!aprovarUtilizador) {
            res.json("Valor nulo")
        } else {
            console.log({ Banido: aprovarUtilizador.banido === true })

            if (aprovarUtilizador.banido === true && aprovarUtilizador.verificado === false && aprovarUtilizador.utilizador !== "PARTICIPANTE"
            ) {
                res.json("Esse email foi banido da aplicação. Já não pode ser confirmado")
            } else {

                const aprovadoUtilizador = prisma.utilizador.update({
                    where: {
                        id: idUtilizador
                    },
                    data: {
                        verificado: true
                    }
                }).then((sucesso) => {
                    res.json(`Usuario: ${sucesso.nome}, confirmado com sucesso`)
                }).catch((error) => {
                    res.json(error)
                })

            }

        }
    } catch (error) {
        res.json(error)
    }


}