import { Utilizador } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../../prisma";
import {
    OrganizadorType,
    QueryParams,
    OrganizadorOmitAtualizarInformacao,
    UtilizadorSchemaInformaçãoPerfil
} from "../../../../validation";

export const AtualizarInformacaoBasica = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params
    const { nome, dataNascimento, localizacao, telefone, iban }: OrganizadorType = req.body

    console.log(typeof (telefone))

    const result = UtilizadorSchemaInformaçãoPerfil.parseAsync({
        nome: nome,
        dataNascimento: new Date(dataNascimento),
        localizacao: localizacao,
        telefone: telefone,
        iban: iban
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
                verificarUtilizadorExiste.utilizador === "ORGANIZADOR"
            ) {

                const atualizarInformacaoBasicaParticipante = await prisma.utilizador.update({
                    where: {
                        id: idUtilizador
                    },
                    data: {
                        nome: (await result).nome,
                        dataNascimento: (await result).dataNascimento,
                        telefone: String((await result).telefone),
                        localizacao: (await result).localizacao,
                        iban: (await result).iban,
                    }
                }).then((sucesso) => {
                    res.json({ "Atualizações das informações feita com sucesso.": sucesso })
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