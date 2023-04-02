import { Utilizador } from "@prisma/client"
import { Request, Response } from "express"
import { prisma } from "../../../prisma"
import { ParticipanteOmitAtualizarInformacao, ParticipanteType, QueryParams } from "../../../validation"

export const InformacaoBasica = async (req: Request, res: Response) => {

   
    const { idUtilizador }: QueryParams = req.params



    const verificarUtilizadorExiste: Utilizador | null = await prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    })

    try {

        if (!verificarUtilizadorExiste) {
            res.json("Valor nulo. Verifique o seu id")
        } else {

            if (
                verificarUtilizadorExiste.id === idUtilizador
                &&
                verificarUtilizadorExiste.utilizador === "ADMIN"
            ) {

                const atualizarInformacaoBasicaParticipante = await prisma.utilizador.findUnique({
                    where: {
                        id: idUtilizador
                    }
                }).then((sucesso) => {
                    res.json({ "Informações da conta": sucesso })
                }).catch((error) => {
                    res.json(error)
                })


            } else {
                res.json("Para fazer atualização desse perfil. Precisa ter uma conta de organizador.")
            }

        }

    } catch (error) {
        res.json(error)
    }


}