import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { Password } from "../../password/password";
import nodemailer from "nodemailer"
import crypto from "crypto"

export type recuperarSenha = {
    email: string
}

const aleatorio: number = Math.floor(Math.random() * 1000000)
const valor : string = (String(`${"2023" + aleatorio}`))


export const RecuperarSenha = async (req: Request, res: Response) => {


    const { email }: recuperarSenha = req.body

    const verificarEmail = await prisma.utilizador.findUnique({
        where: {
            email: email
        }
    }).then(async (sucesso) => {

        if (!email) {
            res.json("Email vazio")
        } else {


            if (!sucesso) {
                res.json("Seu endereço de email está errado")
            } else {

                if (sucesso?.email === email && sucesso.utilizador === "ORGANIZADOR") {

                    const atualizarEmail = await prisma.utilizador.update({
                        where: {
                            email: email
                        },
                        data: {
                            palavraPasse: await Password(valor)
                        }
                    }).then(async (sucesso) => {


                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false,
                            auth: {
                                user: "kaikebartolomeu2003@gmail.com",
                                pass: "ubgpkcctmxmpvlav"
                            }
                        })

                        transporter.sendMail({
                            from: "Rosinaldo Bartolomeu <kaikebartolomeu2003@gmail.com>",
                            to: `${email}`,
                            subject: "Recupere sua senha para voltar usar a Venda Online de bilhetes para eventos culturais e educacionais",
                            text: "",
                            html: `
                                    <h2 >Recuperação de senha</h2>
                                    <p>Sua senha nova é ${valor}</>`
                        }).then(message => {
                            console.log({ "Valido": message })
                            res.status(201).json({ "Sua senha nova é ": valor })
                        }).catch(error => {
                            console.log({ "Errado": error })
                            res.json(error)

                        })

                    }).catch((error) => {
                        res.json(error)
                    })

                } else {
                    res.json("Seu endereço de email está errado")
                }

            }

        }


    }).catch(async (error) => {
        res.json(error)
    })





}