import { Request, Response, Router } from "express";
import { Password } from "../../password/password";
import { prisma } from "../../prisma";
import { ParticipanteOmit, ParticipanteType, VerificarcaoExiste_Participante } from "../../validation";
import nodemailer from "nodemailer"
import mailhog from "mailhog"


const rotaVerificacao = Router()



export const Create = async (req: Request, res: Response) => {


  


    const { nome, palavraPasse, email, localizacao, telefone, dataNascimento }: ParticipanteType = req.body

    console.log(mailhog)
    try {

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
            dataNascimento: new Date(dataNascimento),
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

                            <a href="localhost:3456/participante/verificarContaPalestrante/${sucesso.id}">localhost:3456/participante/verificarContaPalestrante/${sucesso.id} </a>`
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


// import { Request, Response } from "express";
// import { Password } from "../../password/password";
// import { prisma } from "../../prisma";
// import { ParticipanteOmit, ParticipanteType, VerificarcaoExiste_Participante } from "../../validation";

// import nodemailer from "nodemailer"





// export const Create = async (req: Request, res: Response) => {

    

//     const { nome, palavraPasse, email, localizacao, telefone, dataNascimento }: ParticipanteType = req.body


//     try {

//         const verificaoExiste_Participante: VerificarcaoExiste_Participante = {
//             ExisteEmail: await prisma.utilizador.findUnique({
//                 where: {
//                     email: email
//                 }
//             })
//         }
//         const result = ParticipanteOmit.parse({
//             nome: nome,
//             palavraPasse: await Password(palavraPasse),
//             email: email,
//             localizacao: localizacao,
//             dataNascimento: new Date(dataNascimento),
//             telefone: telefone
//         })

//         // const emailExiste = 

//         if (verificaoExiste_Participante.ExisteEmail?.email === email) {
//             res.json("Aviso! Já existe um email cadastrado com esse nome")
//         } else {
//             const CreateParticpante = await prisma.utilizador.create({
//                 data: {
//                     nome: result.nome,
//                     palavraPasse: result.palavraPasse,
//                     email: result.email,
//                     dataNascimento: result.dataNascimento,
//                     localizacao: result.localizacao,
//                     telefone: result.telefone,
//                     utilizador: "PARTICIPANTE",
//                 }
//             }).then((sucesso) => {


//                 res.status(201).json(sucesso)

            

//             }).catch((error: any) => {
//                 res.status(400).json(error)
//             })

//         }


//     } catch (error: any) {
//         res.json(error)
//     }


// }