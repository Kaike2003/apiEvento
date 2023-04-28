import { Utilizador } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma";
import { ParticipanteType, QueryParams, ParticipanteOmitAtualizarInformacao } from "../../../../validation";


export const AtualizarInformacaoBasica = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params
    const { nome, dataNascimento, localizacao, telefone }: ParticipanteType = req.body

    const result = ParticipanteOmitAtualizarInformacao.parseAsync({
        nome: nome,
        dataNascimento: new Date(dataNascimento),
        localizacao: localizacao,
        telefone: telefone,
    })

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
                verificarUtilizadorExiste.utilizador === "PARTICIPANTE"
            ) {

                const atualizarInformacaoBasicaParticipante = await prisma.utilizador.update({
                    where: {
                        id: idUtilizador
                    },
                    data: {
                        nome: (await result).nome,
                        dataNascimento: (await result).dataNascimento,
                        telefone: String((await result).telefone),
                    }
                }).then((sucesso) => {
                    res.json({ "Atualizações das informações feita com sucesso.": sucesso })
                }).catch((error) => {
                    res.json(error)
                })


            } else {
                res.json("Para fazer atualização desse perfil. Precisa ter uma conta de participante.")
            }

        }

    } catch (error) {
        res.json(error)
    }



}