import { Request, Response } from "express";
import nodemailer from "nodemailer"


export const Contacto = (req: Request, res: Response) => {

    interface Icontacto {
        nome: string,
        email: string,
        mensagem: string
    }

    const { nome, email, mensagem }: Icontacto = req.body


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "kaikebartolomeu2003@gmail.com",
            pass: "ubgpkcctmxmpvlav"
        }
    })

    transporter.sendMail({
        from: `${nome}
                        <${email}>`,
        to: `bartolomeu20233@gmail.com`,
        subject: "Obtenção de algumas informações",
        text: "",
        html: `${mensagem}`
    }).then(message => {
        console.log({ "Valido": message })
        res.status(201).json(message)
    }).catch(error => {
        console.log({ "Errado": error })
    })

}