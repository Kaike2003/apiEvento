"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = void 0;
const password_1 = require("../../password/password");
const prisma_1 = require("../../prisma");
const validation_1 = require("../../validation");
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const tamanhoString = 6;
const bytesAleatorios = crypto_1.default.randomBytes(tamanhoString);
const stringAleatoria = bytesAleatorios.toString('base64');
const aleatorio = Math.floor(Math.random() * 1000000);
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { nome, palavraPasse, email, localizacao, telefone, dataNascimento } = req.body;
    console.log(palavraPasse);
    const result = validation_1.ParticipanteOmit.parse({
        nome: nome,
        palavraPasse: yield (0, password_1.Password)(palavraPasse),
        email: email,
        localizacao: localizacao,
        dataNascimento: new Date(dataNascimento),
        telefone: telefone
    });
    const verificaoExiste_Participante = {
        ExisteEmail: yield prisma_1.prisma.utilizador.findUnique({
            where: {
                email: result.email
            }
        })
    };
    if (((_a = verificaoExiste_Participante.ExisteEmail) === null || _a === void 0 ? void 0 : _a.email) === email) {
        res.json("Aviso! Já existe um email cadastrado com esse nome");
    }
    else {
        const aleatorio = Math.random().toString(36).substring(2);
        const CreateParticpante = yield prisma_1.prisma.utilizador.create({
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
        }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("dados", sucesso);
            const verificarConta = yield prisma_1.prisma.utilizador.findFirst({
                where: {
                    email: result.email
                }
            }).then((sucesso) => {
                if (!sucesso) {
                    res.json("Valor nulo");
                }
                else {
                    let transporter = nodemailer_1.default.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: "kaikebartolomeu2003@gmail.com",
                            pass: "ubgpkcctmxmpvlav"
                        }
                    });
                    transporter.sendMail({
                        from: `${result.nome}
                            <kaikebartolomeu2003@gmail.com>`,
                        to: `${result.email}`,
                        subject: "Confirme seu e-mail para começar a usar a Venda Online de bilhetes para eventos culturais e educacionais",
                        text: "",
                        html: `
                            <h2>Venda Online de bilhetes para eventos culturais e educacionais</h2>
                            <p>Confirme seu e-mail para termos certeza de que a solicitação partiu de você. A confirmação do seu e-mail é importante para enviarmos informações sobre sua conta da Venda Online de bilhetes para eventos culturais e educacionais.</p>
                            <h3>Código : ${sucesso.codigo} </h3>
                         `
                    }).then(message => {
                        console.log({ "Valido": message });
                        res.status(201).json(sucesso);
                    }).catch(error => {
                        console.log({ "Errado": error });
                        res.status(400).json(error);
                    });
                }
            }).catch((error) => {
                res.status(400).json(error);
            });
        })).catch((error) => {
            res.status(400).json(error);
        });
    }
});
exports.Create = Create;
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
