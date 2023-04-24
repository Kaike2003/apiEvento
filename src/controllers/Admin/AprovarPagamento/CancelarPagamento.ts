import { Request, Response } from "express";
import { QueryParams } from "../../../validation";
import { prisma } from "../../../prisma";


export const CancelarPagamento = async (req: Request, res: Response) => {

    const { idCompra, idUtilizador }: QueryParams = req.params

    try {
        const verificarUtilizador = await prisma.utilizador.findUnique({
            where: {
                id: idUtilizador
            }
        }).then(async sucessoUtililizador => {

            if (!sucessoUtililizador) {
                res.status(400).json("Utilizador null")
            } else {

                const verificarCompra = await prisma.compra.findUnique({
                    where: {
                        id: idCompra
                    }
                }).then(async sucessoCompra => {

                    if (!sucessoCompra) {
                        res.status(400).json("Compra null")
                    } else {

                        const item_Bilhete_Reserva = await prisma.item_Bilhete.findFirst({
                            where: {
                                compraId: idCompra
                            }
                        }).then(async item_Bilhete_Reserva => {


                            if (!item_Bilhete_Reserva) {
                                res.status(400).json(item_Bilhete_Reserva)
                            } else {

                                const bilhteVerificar = await prisma.bilhete.findUnique({
                                    where: {
                                        id: item_Bilhete_Reserva.bilheteId
                                    }
                                }).then(async sucessoBilhteVerificar => {

                                    if (!sucessoBilhteVerificar) {
                                        res.status(400).json(sucessoBilhteVerificar)
                                    } else {

                                        const voltarAquantidadeBilhete = await prisma.bilhete.update({
                                            where: {
                                                id: sucessoBilhteVerificar.id
                                            },
                                            data: {
                                                quantidade: sucessoCompra.quantidade + sucessoBilhteVerificar.quantidade
                                            }
                                        }).then(async sucessovoltarAquantidadeBilhete => {

                                            if (!sucessovoltarAquantidadeBilhete) {
                                                res.status(400).json("Quantidade bilhete null")
                                            } else {

                                                const apagar_Item_Bilhete = await prisma.item_Bilhete.delete({
                                                    where: {
                                                        id: item_Bilhete_Reserva.id
                                                    }
                                                }).then(async apagar_Item_Bilhete => {


                                                    if (!apagar_Item_Bilhete) {
                                                        console.log(apagar_Item_Bilhete)
                                                        res.status(400).json("item bilhete null")
                                                    } else {
                                                        const apagarReserva = await prisma.compra.delete({
                                                            where: {
                                                                id: idCompra
                                                            }
                                                        }).then(async sucessoApagarReserva => {

                                                            if (!sucessoApagarReserva) {
                                                                res.status(400).json("Apagar reserva null")
                                                            } else {

                                                                res.json(sucessoApagarReserva)
                                                                console.log(sucessoApagarReserva)

                                                            }

                                                        })
                                                    }

                                                }).catch((error) => {
                                                    res.status(400).json(error)
                                                    console.log(error)
                                                })

                                            }



                                        }).catch(error => {
                                            res.status(400).json(error)
                                            console.log(error)
                                        })

                                    }

                                }).catch(error => {
                                    res.status(400).json(error)
                                    console.log(error)
                                })



                            }

                        }).catch(error => {
                            res.status(400).json(error)
                            console.log(error)
                        })


                    }

                }).catch(error => {
                    res.status(400).json(error)
                    console.log(error)
                })


            }

        }).catch(error => {
            res.status(400).json(error)
            console.log(error)
        })

    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
}