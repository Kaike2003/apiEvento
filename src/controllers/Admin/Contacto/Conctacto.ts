import { Request, Response } from "express";
import nodemailer from "nodemailer"


export const Contacto = (req: Request, res: Response) => {

    const { nome, email, genero, mensagem } = req.body


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
                            <kaikebartolomeu2003@gmail.com>` ,
        to: `${email}`,
        subject: "Confirme seu e-mail para começar a usar a Venda Online de bilhetes para eventos culturais e educacionais",
        text: "",
        html: `${mensagem}`
    }).then(message => {
        console.log({ "Valido": message })
        res.status(201).json(message)
    }).catch(error => {
        console.log({ "Errado": error })
    })

}