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
exports.CreateOrg = void 0;
const password_1 = require("../../password/password");
const prisma_1 = require("../../prisma");
const validation_1 = require("../../validation");
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const tamanhoString = 10;
const bytesAleatorios = crypto_1.default.randomBytes(tamanhoString);
const stringAleatoria = bytesAleatorios.toString('base64');
const CreateOrg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { nome, email, localizacao, palavraPasse, telefone, dataNascimento } = req.body;
    const verificaoExiste_Organizador = {
        ExisteEmail: yield prisma_1.prisma.utilizador.findUnique({
            where: {
                email: email
            }
        })
    };
    try {
        const result = validation_1.OrganizadorOmit.parse({
            nome: nome,
            palavraPasse: yield (0, password_1.Password)(palavraPasse),
            email: email,
            localizacao: localizacao,
            dataNascimento: new Date(dataNascimento),
            telefone: telefone
        });
        // const emailExiste = await prisma.utilizador.findUnique({
        //     where: {
        //         email: email
        //     },
        //     select: {
        //         id: true, nome: true, email: true, localizacao: true, telefone: true
        //     }
        // })
        if (((_a = verificaoExiste_Organizador.ExisteEmail) === null || _a === void 0 ? void 0 : _a.email) === email) {
            res.status(400).json("Aviso! Já existe um email cadastrado com esse nome");
        }
        else {
            const create = yield prisma_1.prisma.utilizador.create({
                data: {
                    nome: result.nome,
                    palavraPasse: result.palavraPasse,
                    email: result.email,
                    telefone: String(result.telefone),
                    dataNascimento: result.dataNascimento,
                    localizacao: result.localizacao,
                    utilizador: "ORGANIZADOR",
                    codigo: stringAleatoria,
                    foto: "usuario.png"
                }
            }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
                const verificarConta = yield prisma_1.prisma.utilizador.findFirst({
                    where: {
                        email: result.email
                    }
                }).then((sucesso) => {
                    if (!sucesso) {
                        res.json("Valor nulo kkk");
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
                        });
                    }
                }).catch((error) => {
                    res.status(400).json(error);
                    console.log(error);
                });
            })).catch((error) => {
                res.status(400).json(error);
                console.log(error);
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
});
exports.CreateOrg = CreateOrg;
