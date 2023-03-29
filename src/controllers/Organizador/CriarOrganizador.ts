import { Request, Response } from "express";
import { Password } from "../../password/password";
import { prisma } from "../../prisma";
import { OrganizadorOmit, OrganizadorType, VerificaoExiste_Organizador } from "../../validation";

export const CreateOrg = async (req: Request, res: Response) => {

    const { nome, email, localizacao, palavraPasse, telefone, dataNascimento }: OrganizadorType = req.body

    const verificaoExiste_Organizador: VerificaoExiste_Organizador = {
        ExisteEmail: await prisma.utilizador.findUnique({
            where: {
                email: email
            }
        })
    }

    try {

        const result = OrganizadorOmit.parse({
            nome: nome,
            palavraPasse: await Password(palavraPasse),
            email: email,
            localizacao: localizacao,
            dataNascimento: new Date(dataNascimento),
            telefone: telefone
        })

        // const emailExiste = await prisma.utilizador.findUnique({
        //     where: {
        //         email: email
        //     },
        //     select: {
        //         id: true, nome: true, email: true, localizacao: true, telefone: true
        //     }
        // })


        if (verificaoExiste_Organizador.ExisteEmail?.email === email) {
            res.status(400).json("Aviso! Já existe um email cadastrado com esse nome")
        } else {

            const create = await prisma.utilizador.create({
                data: {
                    nome: result.nome,
                    palavraPasse: result.palavraPasse,
                    email: result.email,
                    telefone: result.telefone,
                    dataNascimento: result.dataNascimento,
                    localizacao: result.localizacao,
                    utilizador: "ORGANIZADOR"
                }
            }).then((sucesso) => {
                res.status(201).json(sucesso)
            }).catch((error) => {
                res.json(error)
            })
        }

    } catch (error) {
        res.status(400).json(error)

    }



}