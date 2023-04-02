import { Utilizador } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma";
import { QueryParams, UtilizadorOmitAtualizarPalavaraPasseType, UtilizadorOmitAtualizarPalavaraPasse } from "../../../../validation";
import bcrypt from "bcrypt"
import { Password } from "../../../../password/password";


export const AtualizarPalavraPasse = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params

    const { palavraPasse, palavraPasseAntiga }: UtilizadorOmitAtualizarPalavaraPasseType = req.body


    const result = UtilizadorOmitAtualizarPalavaraPasse.parseAsync({
        palavraPasse: await Password(palavraPasse),
        palavraPasseAntiga: palavraPasseAntiga
    })


    const verificarUtilizadorExiste: Utilizador | null = await prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    })

    if (!verificarUtilizadorExiste) {

        res.json("Valor nulo. Verifique o seu id")

    } else {


        try {

            if (!verificarUtilizadorExiste) {
                res.json("Valor nulo. Verifique o seu id")
            } else {


                const senhaCorreta = await bcrypt.compare(palavraPasseAntiga, verificarUtilizadorExiste.palavraPasse)

                if (!senhaCorreta) {
                    res.json("Senha incorreta. Verifique sua senha")
                } else {

                    if (
                        verificarUtilizadorExiste.id === idUtilizador
                        &&
                        verificarUtilizadorExiste.utilizador === "ORGANIZADOR"
                    ) {

                        const atualizarInformacaoBasicaParticipante = await prisma.utilizador.update({
                            where: {
                                id: idUtilizador
                            },
                            data: {
                                palavraPasse: (await result).palavraPasse
                            }
                        }).then((sucesso) => {
                            res.json({ "Atualizações da palavra passe feita com sucesso.": sucesso })
                        }).catch((error) => {
                            res.json(error)
                        })


                    } else {
                        res.json("Para fazer atualização desse perfil. Precisa ter uma conta de participante.")
                    }
                }



            }

        } catch (error) {
            res.json(error)
        }

    }


}