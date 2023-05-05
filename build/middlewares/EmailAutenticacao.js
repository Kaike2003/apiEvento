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
exports.EmailAutenticacao = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const EmailAutenticacao = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let testAccount = yield nodemailer_1.default.createTestAccount();
    let transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass, // generated ethereal password
        },
    });
    let message = {
        from: '"Fred Foo 👻" <foo@example.com>',
        to: "bar@example.com, baz@example.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>", // html body
    };
    transporter.sendMail(message).then((sucessso) => {
        res.status(201).json({ "Mensagem enviada com sucesso": sucessso });
        console.log(sucessso);
    }).catch((error) => {
        res.status(500).json(error);
        console.log(error);
    });
});
exports.EmailAutenticacao = EmailAutenticacao;
