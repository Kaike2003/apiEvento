import { Request, Response } from "express";
import { QueryParams, ReservaOmit, ReservaType } from "../../../../validation";
import { prisma } from "../../../../prisma";
import crypto from "crypto"
import fs from 'fs';
import nodeSchedule from "node-schedule"


let views: number = 0;


type Body = {
    quantidade: number
    bilheteId: string
}

// const rule = new nodeSchedule.RecurrenceRule()
// rule.date = new Date().getDate() + 1
// rule.hour = 23
// rule.minute = 59
// rule.second = 59
// rule.month = new Date().getMonth()

// const data = new Date(2023, 3, 16, 2, 21)

// const job = nodeSchedule.scheduleJob(data, async (fireDate) => {


//     const listaReservas = await prisma.reserva.findMany({
//         where: {
//             foto: null,
//             pagamento: false
//         }
//     }).then(async (reserva) => {

//         reserva.map(async (itemReserva) => {

//             await prisma.item_Bilhete.findMany({
//                 where: {
//                     reservaId: itemReserva.id
//                 }
//             }).then(async (bilhete_item) => {

//                 bilhete_item.map(async (itemBilhete) => {

//                     await prisma.bilhete.findMany(
//                         {
//                             where: {
//                                 id: itemBilhete.bilheteId
//                             }
//                         }
//                     ).then(async (bilhete) => {

//                         bilhete.map(async (itemBilheteBilhete) => {

//                             if (itemBilheteBilhete.id === itemBilhete.bilheteId
//                                 &&
//                                 itemReserva.id === itemBilhete.reservaId
//                             ) {


//                                 await prisma.bilhete.update({
//                                     where: {
//                                         id: itemBilheteBilhete.id
//                                     },
//                                     data: {
//                                         quantidade: itemReserva.quantidade + itemBilheteBilhete.quantidade
//                                     }
//                                 }).then(async (sucesso) => {


//                                     await prisma.reserva.update({
//                                         where: {
//                                             id: itemReserva.id
//                                         },
//                                         data: {
//                                             quantidade: itemReserva.quantidade - itemReserva.quantidade
//                                         }
//                                     }).then((sucesso) => {
//                                         console.log(sucesso.quantidade)
//                                     })

//                                     console.log(sucesso.quantidade)

//                                 }).catch((error) => {
//                                     console.log(error)
//                                 })

//                             } else {

//                                 console.log("Olá")

//                             }

//                         })



//                     }).catch((error) => {
//                         console.log(error)
//                     })

//                 })


//             }).catch((error) => {
//                 console.log(error)
//             })

//         })


//     }).catch((error) => {
//         console.log(error)
//     })



// })

// console.log(job.nextInvocation())






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

    console.log(quantidade, bilheteId)
    console.log(typeof (quantidade))
    console.log(typeof (bilheteId))


    const result = ReservaOmit.parseAsync({
        quantidade: quantidade,
        bilheteId: bilheteId,
        metodoPagamento: "Dinheiro"
    })

    const verificarEvento = await prisma.evento.findFirst({
        where: {
            id: idEvento,
            estado: "DESPONIVEL"
        }
    }).then(async (sucessoEvento) => {

        const verificarUtizalidor = await prisma.utilizador.findFirst({
            where: {
                id: idUtilizador
            }
        }).then(async (sucessoUtilizador) => {

            if (!sucessoUtilizador) {
                res.status(400).json("valor nulo")
            } else {

                if (sucessoUtilizador.utilizador === "PARTICIPANTE") {

                    const verificarBilhete = await prisma.bilhete.findFirst({
                        where: {
                            id: (await result).bilheteId
                        }
                    }).then(async (sucessoBilhete) => {

                        if (!sucessoBilhete) {
                            res.status(400).json("bilhete não pode ser nulo")
                        } else {

                            if (sucessoBilhete.quantidade === 0) {
                                res.status(400).json("Bilhete para este evento estão esgotados.")
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
                                                compra: {
                                                    create: {
                                                        total: sucessoBilhete?.preco * (await result).quantidade,
                                                        metodoPagamento: "Dinheiro",
                                                        quantidade: (await result).quantidade,
                                                        pagamento: false,
                                                        utilizadorId: idUtilizador
                                                    }
                                                }
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

                                                res.status(201).json({
                                                    "Codigo da sua reserva": stringAleatoria,
                                                    "Quantidade de bilhetes reservados": quantidade
                                                })
                                            }).catch((error) => {
                                                res.status(400).json(error)
                                            })

                                        }).catch((error) => {
                                            res.status(400).json(error)
                                        })



                                    } else {
                                        res.status(400).json("A quantidade bilhete não pode ser negativa.")
                                    }








                                } else {
                                    res.status(400).json(`A quantidade de bilhete desponivel para esse evento é ${sucessoBilhete.quantidade}. Então reserve bilhetes menores que ${sucessoBilhete.quantidade}. `)
                                }


                            }





                        }

                    }).catch((error) => {
                        res.status(400).json(error)
                    })



                } else {

                    res.status(400).json("Só os participantes podem comprar bilhetes.")

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
            res.status(400).json(error)
        })

    }).catch((error) => {
        res.status(400).json(error)
    })



}





