import { Request, Response } from "express";
import { QueryParams } from "../../../validation";
import { prisma } from "../../../prisma";
import QRCODE from "qrcode"
import nodemailer from "nodemailer"

type Data = {
    idCompra: string
    idUtilizador: string
}

export const AprovarPagamento = async (req: Request, res: Response) => {

    const { idUtilizador, idCompra }: QueryParams = req.params


    try {
        const verificarReserva = await prisma.compra.findFirst({
            where: {
                id: idCompra,
                utilizadorId: idUtilizador
            }
        }).then(async (sucessoCompra) => {

            if (!sucessoCompra) {
                res.status(400).json({ "O valor da reserva não pode ser nulo": sucessoCompra })
            } else {

                if (sucessoCompra.foto === null) {
                    res.status(400).json("Compra sem comprovativo")
                } else {


                    const aprovarPagamento = await prisma.compra.update({
                        where: {
                            id: sucessoCompra?.id
                        },
                        data: {
                            pagamento: true
                        }
                    }).then(async (sucessoPagamento) => {

                        const data: Data = {
                            idCompra: sucessoPagamento.id,
                            idUtilizador: sucessoPagamento.utilizadorId
                        }

                        const dataString: string = JSON.stringify(data)


                        QRCODE.toFile(`./public/upload/codigoQr/${sucessoPagamento.id}.png`, dataString).then(async url => {
                            console.log("Url", url)

                            const verificarUtilizador = await prisma.utilizador.findUnique({
                                where: {
                                    id: idUtilizador
                                }
                            }).then(async (sucessoUtilizador) => {

                                if (!sucessoUtilizador) {
                                    res.status(400).json("Valor nulo")
                                } else {


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
                                        from: `${sucessoUtilizador.email}
                                            <kaikebartolomeu2003@gmail.com>` ,
                                        to: `${sucessoUtilizador.email}`,
                                        subject: "Código qr",
                                        text: "",
                                        html: `
                                            Foto: http://localhost:3456/public/upload/codigoQr/${sucessoCompra.id}.png
                                            <img src="http://localhost:3456/public/upload/codigoQr/04a25202-3064-4396-8a3d-20c9931ac03e.png" alt="codigo" />
                                                    `
                                    }).then(message => {
                                        console.log({ "Valido": message })
                                        res.status(201).json(sucessoUtilizador)
                                    }).catch(error => {
                                        console.log({ "Errado": error })
                                    })



                                }


                            }).catch(error => {
                                res.status(400).json(error)
                                console.log("Error", error)
                            })


                        }).catch(error => {
                            console.log("Error", error)
                        })





                    }).catch((error) => {
                        console.log("Error", error)
                        res.status(400).json(error)

                    })

                }
            }


        }).catch((error) => {
            res.status(400).json(error)
            console.log("Error", error)
        })



    } catch (error) {
        res.status(400).json(error)
        console.log("Error", error)
    }

}


