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
exports.RecuperarSenha = void 0;
const prisma_1 = require("../../prisma");
const password_1 = require("../../password/password");
const nodemailer_1 = __importDefault(require("nodemailer"));
const aleatorio = Math.floor(Math.random() * 1000000);
const valor = (String(`${"2023" + aleatorio}`));
const RecuperarSenha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const verificarEmail = yield prisma_1.prisma.utilizador.findUnique({
        where: {
            email: email
        }
    }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
        if (!email) {
            res.json("Email vazio");
        }
        else {
            if (!sucesso) {
                res.json("Seu endereço de email está errado");
            }
            else {
                if ((sucesso === null || sucesso === void 0 ? void 0 : sucesso.email) === email && sucesso.utilizador === "ORGANIZADOR") {
                    const atualizarEmail = yield prisma_1.prisma.utilizador.update({
                        where: {
                            email: email
                        },
                        data: {
                            palavraPasse: yield (0, password_1.Password)(valor)
                        }
                    }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
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
                            from: "Rosinaldo Bartolomeu <kaikebartolomeu2003@gmail.com>",
                            to: `${email}`,
                            subject: "Recupere sua senha para voltar usar a Venda Online de bilhetes para eventos culturais e educacionais",
                            text: "",
                            html: `
                                    <h2 >Recuperação de senha</h2>
                                    <p>Sua senha nova é ${valor}</>`
                        }).then(message => {
                            console.log({ "Valido": message });
                            res.status(201).json({ "Sua senha nova é ": valor });
                        }).catch(error => {
                            console.log({ "Errado": error });
                            res.json(error);
                        });
                    })).catch((error) => {
                        res.json(error);
                    });
                }
                else {
                    res.json("Seu endereço de email está errado");
                }
            }
        }
    })).catch((error) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(error);
    }));
});
exports.RecuperarSenha = RecuperarSenha;
