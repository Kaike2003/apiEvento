import { Request, Response } from "express";
import { Password } from "../../password/password";
import { prisma } from "../../prisma";
import { ParticipanteOmit, ParticipanteType, VerificarcaoExiste_Participante } from "../../validation";

export const Create = async (req: Request, res: Response) => {


    try {

        const { nome, palavraPasse, email, localizacao, telefone, dataNascimento }: ParticipanteType = req.body

        const verificaoExiste_Participante: VerificarcaoExiste_Participante = {
            ExisteEmail: await prisma.utilizador.findUnique({
                where: {
                    email: email
                }
            })
        }
        const result = ParticipanteOmit.parse({
            nome: nome,
            palavraPasse: await Password(palavraPasse),
            email: email,
            localizacao: localizacao,
            dataNascimento: dataNascimento,
            telefone: telefone
        })

        // const emailExiste = 

        if (verificaoExiste_Participante.ExisteEmail?.email === email) {
            res.json("Aviso! Já existe um email cadastrado com esse nome")
        } else {
            const CreateParticpante = await prisma.utilizador.create({
                data: {
                    nome: result.nome,
                    palavraPasse: result.palavraPasse,
                    email: result.email,
                    dataNascimento: result.dataNascimento,
                    localizacao: result.localizacao,
                    telefone: result.telefone,
                    utilizador: "PARTICIPANTE",
                }
            }).then((sucesso) => {
                res.status(201).json(sucesso)
            }).catch((error: any) => {
                res.status(400).json(error)
            })

        }


    } catch (error: any) {
        res.json(error)
    }


}