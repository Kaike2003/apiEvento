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
const prisma_1 = require("../../prisma");
const password_1 = require("../../password/password");
const validation_1 = require("../../validation");
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const tamanhoString = 8;
const bytesAleatorios = crypto_1.default.randomBytes(tamanhoString);
const stringAleatoria = bytesAleatorios.toString('base64');
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { palavraPasse, email } = req.body;
    const verificaoExiste_Admin = {
        ExisteEmail: yield prisma_1.prisma.utilizador.findUnique({
            where: {
                email: email
            }
        })
    };
    try {
        const result = validation_1.AdminTypeOmit.parse({
            palavraPasse: yield (0, password_1.Password)(palavraPasse),
            email: email,
        });
        if (((_a = verificaoExiste_Admin.ExisteEmail) === null || _a === void 0 ? void 0 : _a.email) === email) {
            res.json("Aviso! Já existe um email cadastrado com esse nome");
        }
        else {
            const Create = yield prisma_1.prisma.utilizador.create({
                data: {
                    palavraPasse: result.palavraPasse,
                    email: result.email,
                    utilizador: "ADMIN",
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
                            from: `${result.email}
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
                });
            })).catch((error) => {
                res.status(400).json(error);
            });
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.Create = Create;
