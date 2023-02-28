import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { Password } from "../../password/password";
import { AdminTypeOmit, AdminType, VerificarcaoExiste_Admin } from "../../validation";



export const Create = async (req: Request, res: Response) => {

    const { nome, palavraPasse, email }: AdminType = req.body

    const verificaoExiste_Admin: VerificarcaoExiste_Admin = {
        ExisteEmail: await prisma.utilizador.findUnique({
            where: {
                email: email
            }
        })
    }

    try {

        const result = AdminTypeOmit.parse({
            nome: nome,
            palavraPasse: await Password(palavraPasse),
            email: email,
        })

        if (verificaoExiste_Admin.ExisteEmail?.email === email) {
            res.json("Aviso! Já existe um email cadastrado com esse nome")
        } else {
            const Create = await prisma.utilizador.create({
                data: {
                    nome: result.nome,
                    palavraPasse: result.palavraPasse,
                    email: result.email,
                    localizacao: "",
                    telefone: "",
                    utilizador: "ADMIN"
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
