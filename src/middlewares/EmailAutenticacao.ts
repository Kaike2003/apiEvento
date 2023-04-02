import { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer"

interface Message {
    from: string
    to: string
    subject: string
    text: string
    html: string
}

export const EmailAutenticacao = async (req: Request, res: Response, next: NextFunction) => {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });



    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    } as Message


    transporter.sendMail(message).then((sucessso) => {
        res.status(201).json({ "Mensagem enviada com sucesso": sucessso })
        console.log(sucessso)
    }).catch((error) => {
        res.status(500).json(error)
        console.log(error)

    })



}