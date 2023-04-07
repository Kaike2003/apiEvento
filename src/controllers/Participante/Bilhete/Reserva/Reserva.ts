import { Request, Response } from "express";
import { QueryParams, ReservaOmit, ReservaType } from "../../../../validation";
import { prisma } from "../../../../prisma";
import crypto from "crypto"
import fs from 'fs';

let views: number = 0;


type Body = {
    quantidade: number
    bilheteId: string
}


const tamanhoString = 8
const bytesAleatorios = crypto.randomBytes(tamanhoString);
const stringAleatoria = bytesAleatorios.toString('base64');


export const Reserva = async (req: Request, res: Response) => {

    views++;
    fs.writeFile('views.txt', views.toString(), (err) => {
        if (err) throw err;
    });

    const { idUtilizador, idEvento }: QueryParams = req.params

    const { quantidade, bilheteId }: ReservaType = req.body

    const result = ReservaOmit.parseAsync({
        quantidade: quantidade,
        bilheteId: bilheteId,
        metodoPagamento: "Dinheiro"
    })

    const verificarEvento = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    }).then(async (sucessoEvento) => {

        const verificarUtizalidor = await prisma.utilizador.findFirst({
            where: {
                id: idUtilizador
            }
        }).then(async (sucessoUtilizador) => {

            if (!sucessoUtilizador) {
                res.json("valor nulo")
            } else {

                if (sucessoUtilizador.utilizador === "PARTICIPANTE") {

                    const verificarBilhete = await prisma.bilhete.findFirst({
                        where: {
                            id: (await result).bilheteId
                        }
                    }).then(async (sucessoBilhete) => {

                        if (!sucessoBilhete) {
                            res.json("bilhete não pode ser nulo")
                        } else {

                            if (sucessoBilhete.quantidade === 0) {
                                res.json("Bilhete para este evento estão esgotados")
                            } else {

                                if (quantidade <= sucessoBilhete.quantidade) {


                                    if (quantidade >= 1) {

                                        const itemBilehte = await prisma.item_Bilhete.create({
                                            data: {
                                                bilhete: {
                                                    connect: {
                                                        id: (await result).bilheteId
                                                    }
                                                },
                                                reserva: {
                                                    create: {
                                                        total: sucessoBilhete?.preco * (await result).quantidade,
                                                        metodoPagamento: "Dinheiro",
                                                        quantidade: (await result).quantidade,
                                                        utilizadorId: idUtilizador
                                                    }
                                                },
                                                nome: stringAleatoria
                                            }
                                        }).then(async (sucessoBilheteQuantidade) => {
                                            const reduzirBilhetes = await prisma.bilhete.update({
                                                where: {
                                                    id: (await result).bilheteId
                                                },
                                                data: {
                                                    quantidade: sucessoBilhete.quantidade - (await result).quantidade
                                                }
                                            }).then(async (reservaFeita) => {

                                                fs.readFile('views.txt', (err, data) => {
                                                    if (err) throw err;
                                                    views = parseInt(data.toString());
                                                    console.log(`Número anterior de visualizações: ${views}`);
                                                  })

                                                res.json({
                                                    "Codigo da sua reserva": stringAleatoria,
                                                    "Quantidade de bilhetes reservados": quantidade
                                                })
                                            }).catch((error) => {
                                                res.json(error)
                                            })

                                        }).catch((error) => {
                                            res.json(error)
                                        })



                                    } else {
                                        res.json("A quantidade bilhete não pode ser negativa.")
                                    }








                                } else {
                                    res.json("A quantidade de bilhete que quer é menor doque a quantidade de bilhetes desponiveis")
                                }


                            }





                        }

                    }).catch((error) => {
                        res.json(error)
                    })



                } else {

                    res.json("Só os participantes podem reservar bilhetes")

                }


            }

            // const reservar = await prisma.reserva.create({
            //     data: {
            //         quantidade: quantidade,
            //         total: 40,
            //         metodoPagamento: "Dinheiro",
            //     }
            // })




        }).catch((error) => {
            res.json(error)
        })

    }).catch((error) => {
        res.json(error)
    })


}



