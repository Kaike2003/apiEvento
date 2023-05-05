"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacto = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const Contacto = (req, res) => {
    const { nome, email, mensagem } = req.body;
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
        from: `${nome}
                        <${email}>`,
        to: `bartolomeu20233@gmail.com`,
        subject: "Obtenção de algumas informações",
        text: "",
        html: `${mensagem}`
    }).then(message => {
        console.log({ "Valido": message });
        res.status(201).json(message);
    }).catch(error => {
        console.log({ "Errado": error });
    });
};
exports.Contacto = Contacto;
