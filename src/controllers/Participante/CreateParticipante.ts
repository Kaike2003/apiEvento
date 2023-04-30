import { Request, Response, Router } from "express";
import { Password } from "../../password/password";
import { prisma } from "../../prisma";
import { ParticipanteOmit, ParticipanteType, VerificarcaoExiste_Participante } from "../../validation";
import nodemailer from "nodemailer"
import crypto from "crypto"


const tamanhoString = 6
const bytesAleatorios = crypto.randomBytes(tamanhoString);
const stringAleatoria = bytesAleatorios.toString('base64');

const aleatorio: number = Math.floor(Math.random() * 1000000)

export const Create = async (req: Request, res: Response) => {


    const { nome, palavraPasse, email, localizacao, telefone, dataNascimento }: ParticipanteType = req.body
    
    console.log(palavraPasse)
    
        const result = ParticipanteOmit.parse({
            nome: nome,
            palavraPasse: await Password(palavraPasse),
            email: email,
            localizacao: localizacao,
            dataNascimento: new Date(dataNascimento),
            telefone: telefone
        })



        const verificaoExiste_Participante: VerificarcaoExiste_Participante = {
            ExisteEmail: await prisma.utilizador.findUnique({
                where: {
                    email: result.email
                }
            })
        }
        

        if (verificaoExiste_Participante.ExisteEmail?.email === email) {
            res.json("Aviso! Já existe um email cadastrado com esse nome")
        } else {

          const aleatorio: string = Math.random().toString(36).substring(2)
          
            const CreateParticpante = await prisma.utilizador.create({
                data: {
                    nome: result.nome,
                    palavraPasse: result.palavraPasse,
                    email: result.email,
                    dataNascimento: result.dataNascimento,
                    localizacao: result.localizacao,
                    telefone: String(result.telefone),
                    utilizador: "PARTICIPANTE",
                    codigo: aleatorio,
                    foto: "usuario.png"
                }
            }).then(async(sucesso) => {          
            
                console.log("dados", sucesso)
                const verificarConta = await prisma.utilizador.findFirst({
                    where: {
                        email: result.email
                    }
                }).then((sucesso)=>{

                    if(!sucesso){
                        res.json("Valor nulo")
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
                            from: `${result.nome}
                            <kaikebartolomeu2003@gmail.com>` ,
                            to: `${result.email}`,
                            subject: "Confirme seu e-mail para começar a usar a Venda Online de bilhetes para eventos culturais e educacionais",
                            text: "",
                            html: `
                            <h2>Venda Online de bilhetes para eventos culturais e educacionais</h2>
                            <p>Confirme seu e-mail para termos certeza de que a solicitação partiu de você. A confirmação do seu e-mail é importante para enviarmos informações sobre sua conta da Venda Online de bilhetes para eventos culturais e educacionais.</p>
                            <h3>Código : ${sucesso.codigo} </h3>
                         `
                        }).then(message=>{
                            console.log({"Valido":message})
                            res.status(201).json(sucesso)
                        }).catch(error=>{
                            console.log({"Errado": error})
                            res.status(400).json(error)

                        })                
                    }
   

                }).catch((error)=>{
                res.status(400).json(error)
                })

      
            }).catch((error: any) => {
                res.status(400).json(error)
            })

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