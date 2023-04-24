import { Request, Response } from "express";
import { QueryParams } from "../../../validation";
import { prisma } from "../../../prisma";


export const AdicioanarComprovativo = async (req: Request, res: Response) => {


    const { idCompra, idUtilizador }: QueryParams = req.params

    const foto = req.file


    console.log(foto)

    const verificarUtilizador = await prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    }).then(async (sucesso) => {

        if (!sucesso) {
            res.json("Nulo, verifique os parametros")
        } else {


            const verificarReserva = await prisma.compra.findUnique({
                where: {
                    id: idCompra
                }
            }).then(async (sucessoCompra) => {

                if (!sucessoCompra) {
                    res.status(400).json("Nulo, verifique os parametros")
                } else {

                    if (sucesso.id === sucessoCompra.utilizadorId) {

                        if (!foto) {
                            res.json("A foto não pode ser undefined")
                        } else {

                            if (foto.size <= 39769) {


                                const adicionarComprovaito = await prisma.compra.update({
                                    where: {
                                        id: idCompra
                                    },
                                    data: {
                                        foto: foto.filename
                                    }
                                }).then(async (sucessoFoto) => {

                                    res.json(sucessoFoto)

                                }).catch((error) => {
                                    res.status(400).json(error)
                                    console.log(error)
                                })


                            } else {
                                res.status(400).json("Verifique seu comprovativo, talvéz não seja válido.")
                            }

                        }


                    } else {
                        res.status(400).json("Id do utilizador ou da reserva inválido")
                    }

                }



            })

        }



    }).catch((error) => {
        res.json(error)
    })


}