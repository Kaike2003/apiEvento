import { Request, Response } from "express"
import { prisma } from "../../../../prisma"
import { EventoType, EventoOmit, VerificaoExiste_Evento, QueryParams, } from "../../../../validation";




export const ApagarEvento = async (req: Request, res: Response) => {

    const { idUtilizador, idEvento }: QueryParams = req.params

    const verificarIdEventoExiste = await prisma.evento.findUnique({
        where: {
            id: String(idEvento),
        }
    }).then(async (sucessoEvento) => {

        if (!sucessoEvento) {
            res.json({ "Dados nulo": sucessoEvento })
        } else {

            const verificarIdUtilizadorExiste = await prisma.utilizador.findUnique({
                where: {
                    id: String(idUtilizador)
                }
            }).then(async (sucessoUtilizador) => {


                if (!sucessoUtilizador) {
                    res.json({ "Dados nulo": sucessoUtilizador })
                } else {

                    if (
                        sucessoEvento?.estado === "DESPONIVEL"
                        &&
                        sucessoEvento?.utilizadorId === sucessoUtilizador?.id
                        &&
                        sucessoUtilizador?.utilizador === "ORGANIZADOR"
                    ) {


                        const apagarBilhetes = await prisma.bilhete.findMany({
                            where: {
                                eventoId: sucessoEvento.id
                            }
                        }).then(async (sucessoBilhete) => {

                            sucessoBilhete.map(async itemBilhetes => {

                                await prisma.bilhete.findUnique({
                                    where: {
                                        id: itemBilhetes.id
                                    }
                                }).then(async (sucessoBilheteSelecionado) => {

                                    await prisma.bilhete.delete({
                                        where: {
                                            id: sucessoBilheteSelecionado?.id
                                        }
                                    }).then(() => {
                                        res.status(200)
                                        console.log("Bilhete apagado com sucesso")
                                    }).catch(error => {
                                        res.status(400)
                                        console.log(error)
                                    })
                                }).catch((error) => {
                                    res.status(400).json(error)
                                    console.log(error)
                                })

                            })


                        }).catch((error) => {
                            res.status(400)
                            console.log(error)
                        })

                        const apagarOradores = await prisma.orador_Evento.findMany({
                            where: {
                                eventoId: sucessoEvento.id
                            }
                        }).then((sucessoOradores) => {


                            sucessoOradores.map(async itemOradores => {

                                await prisma.orador.findUnique({
                                    where: {
                                        id: itemOradores.oradorId
                                    }
                                }).then(async sucesssoOradoresSelecionado => {


                                    await prisma.orador_Evento.delete({
                                        where: {
                                            oradorId_eventoId: {
                                                eventoId: sucessoEvento.id,
                                                oradorId: itemOradores.oradorId
                                            }
                                        }
                                    }).then((sucessoOradoresApagado) => {

                                        res.status(200)
                                        console.log("Oradores apagados", sucessoOradoresApagado)

                                    }).catch((error) => {
                                        res.status(400)
                                        console.log(error)

                                    })

                                })

                            })

                        }).catch((error) => {
                            res.status(400)
                            console.log(error)
                        })


                        const apagarPalestrante = await prisma.palestrante_Evento.findMany({
                            where: {
                                eventoId: sucessoEvento.id
                            }
                        }).then((sucessoPalestrantes) => {


                            sucessoPalestrantes.map(async itemPalestrantes => {

                                await prisma.palestrante.findUnique({
                                    where: {
                                        id: itemPalestrantes.palestranteId
                                    }
                                }).then(async sucesssoPalestrantesSelecionado => {


                                    await prisma.palestrante_Evento.delete({
                                        where: {
                                            palestranteId_eventoId: {
                                                eventoId: sucessoEvento.id,
                                                palestranteId: itemPalestrantes.palestranteId
                                            }
                                        }
                                    }).then((sucessoPalestrantesApagado) => {

                                        res.status(200)
                                        console.log("Palestrantes apagados", sucessoPalestrantesApagado)

                                    }).catch((error) => {
                                        res.status(400)
                                        console.log(error)

                                    })

                                })

                            })

                        }).catch((error) => {
                            res.status(400).json(error)
                        })

                        console.log("Id do evento", sucessoEvento.id)

                        const apagarEvento = await prisma.evento.delete({
                            where: {
                                id: idEvento
                            }
                        }).then((sucessoEventoApagado) => {

                            res.status(200).json({ "Evento apagado": sucessoEventoApagado })
                            console.log("Evento apagado", sucessoEventoApagado)


                        }).catch((error) => {
                            res.status(400)
                            console.log(error)
                        })



                    } else {
                        res.status(400).json("Não podes excluir esse evento.")
                        console.log("Não podes excluir esse evento.")

                    }

                }


            })




        }





    }).catch((error) => {
        res.status(400).json(error)

    })











}