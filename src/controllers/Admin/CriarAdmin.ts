import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { Password } from "../../password/password";
import { AdminTypeOmit, AdminType, VerificarcaoExiste_Admin } from "../../validation";

import nodemailer from "nodemailer"


export const Create = async (req: Request, res: Response) => {

    const { nome, palavraPasse, email, dataNascimento }: AdminType = req.body

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
            dataNascimento: new Date(dataNascimento)
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
                    dataNascimento: result.dataNascimento,
                    telefone: "",
                    utilizador: "ADMIN"
                }
            }).then(async(sucesso) => {          
            

                const verificarConta = await prisma.utilizador.findFirst({
                    where: {
                        email: result.email
                    }
                }).then((sucesso)=>{

                    if(!sucesso){
                        res.json("Valor nulo kkk")
                    } else{

          
                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false,
                            auth:{
                                user: "kaikebartolomeu2003@gmail.com",
                                pass: "ubgpkcctmxmpvlav"
                            }
                        })
                    
                     transporter.sendMail({
                            from: "Rosinaldo Bartolomeu <kaikebartolomeu2003@gmail.com>",
                            to: `${result.email}`,
                            subject: "Confirme seu e-mail para começar a usar a KaikeEventos",
                            text: "",
                            html: `
                            <h2 >KaikeEventos</h2>
                            <p>Confirme seu e-mail para termos certeza de que a solicitação partiu de você. A confirmação do seu e-mail é importante para enviarmos informações sobre sua conta da KaikeEventos.</>

                            <a href="localhost:3456/admin/verificarAdmin/:${sucesso.id}">localhost:3456/admin/verificarAdmin/:${sucesso.id} </a>`
                        }).then(message=>{
                            console.log({"Valido":message})
                            res.status(201).json(sucesso)
                        }).catch(error=>{
                            console.log({"Errado": error})
                        })
            
        
                        
                    }
   

                }).catch((error)=>{
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
