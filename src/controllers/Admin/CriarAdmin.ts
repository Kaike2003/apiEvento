import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { Password } from "../../password/password";
import { AdminTypeOmit, AdminType, VerificarcaoExiste_Admin } from "../../validation";
import crypto from "crypto"
import nodemailer from "nodemailer"


const tamanhoString = 8
const bytesAleatorios = crypto.randomBytes(tamanhoString);
const stringAleatoria = bytesAleatorios.toString('base64');

export const Create = async (req: Request, res: Response) => {

    const { palavraPasse, email }: AdminType = req.body

    const verificaoExiste_Admin: VerificarcaoExiste_Admin = {
        ExisteEmail: await prisma.utilizador.findUnique({
            where: {
                email: email
            }
        })
    }

    try {

        const result = AdminTypeOmit.parse({
            palavraPasse: await Password(palavraPasse),
            email: email,
        })

        if (verificaoExiste_Admin.ExisteEmail?.email === email) {
            res.json("Aviso! Já existe um email cadastrado com esse nome")
        } else {
            const Create = await prisma.utilizador.create({
                data: {
                    palavraPasse: result.palavraPasse,
                    email: result.email,
                    utilizador: "ADMIN",
                    codigo: stringAleatoria,
                    foto: "usuario.png"
                }
            }).then(async (sucesso) => {


                const verificarConta = await prisma.utilizador.findFirst({
                    where: {
                        email: result.email
                    }
                }).then((sucesso) => {

                    if (!sucesso) {
                        res.json("Valor nulo kkk")
                    } else {


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
                            from: `${result.email}
                            <kaikebartolomeu2003@gmail.com>` ,
                            to: `${result.email}`,
                            subject: "Confirme seu e-mail para começar a usar a Reserva online",
                            text: "",
                            html: `
                            <h2 >Reserva online</h2>
                            <p>Confirme seu e-mail para termos certeza de que a solicitação partiu de você.</p> 
                            <p>A confirmação do seu e-mail é importante para enviarmos informações sobre sua conta da reserva online.</p>
                            <span
                            style={{color: "red"}}
                            >Código</span>:<h3>  ${sucesso.codigo} </h3>
                         `
                        }).then(message => {
                            console.log({ "Valido": message })
                            res.status(201).json(sucesso)
                        }).catch(error => {
                            console.log({ "Errado": error })
                        })

                    }


                }).catch((error) => {
                    res.status(400).json(error)
                })


            }).catch((error: any) => {
                res.status(400).json(error)
            })

        }

    } catch (error: any) {
        res.json(error)
    }





}
