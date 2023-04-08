import { Utilizador } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { AdminType, QueryParams, AdminAtualizarPalavraPasseOmit } from "../../../validation";



export const AtualizarInformacaoBasica = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params
    // const { nome, dataNascimento }: AdminType = req.body

    // const result = AdminAtualizarPalavraPasseOmit.parseAsync({
    //     nome: nome,
    //     dataNascimento: new Date(dataNascimento),
    // })

    // const verificarUtilizadorExiste: Utilizador | null = await prisma.utilizador.findUnique({
    //     where: {
    //         id: idUtilizador
    //     }
    // })

    // try {

    //     if (!verificarUtilizadorExiste) {
    //         res.json("Valor nulo. Verifique o seu id")
    //     } else {

    //         if (
    //             verificarUtilizadorExiste.id === idUtilizador
    //             &&
    //             verificarUtilizadorExiste.utilizador === "ADMIN"
    //         ) {

    //             const atualizarInformacaoBasicaParticipante = await prisma.utilizador.update({
    //                 where: {
    //                     id: idUtilizador
    //                 },
    //                 data: {
    //                     nome: (await result).nome,
    //                     dataNascimento: (await result).dataNascimento,
    //                 }
    //             }).then((sucesso) => {
    //                 res.json({ "Atualizações das informações feita com sucesso.": sucesso })
    //             }).catch((error) => {
    //                 res.json(error)
    //             })


    //         } else {
    //             res.json("Para fazer atualização desse perfil. Precisa ter uma conta de Administrador.")
    //         }

    //     }

    // } catch (error) {
    //     res.json(error)
    // }

}