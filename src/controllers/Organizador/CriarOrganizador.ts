import { Request, Response } from "express";
import { Password } from "../../password/password";
import { prisma } from "../../prisma";
import { OrganizadorOmit, OrganizadorType, VerificaoExiste_Organizador } from "../../validation";
import nodemailer from "nodemailer"

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

                            <a href="localhost:3456/organizador/verificarOrganizador/${sucesso.id}">localhost:3456/organizador/verificarOrganizador/${sucesso.id} </a>`
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

    } catch (error) {
        res.status(400).json(error)

    }



}