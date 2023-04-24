import { Request, Response } from "express";
import { prisma } from "../../../../prisma";



const diaAtual = new Date().getDate()
const mesAtual = new Date().getMonth()
const anoAtual = new Date().getFullYear()


export const Palestra = async (req: Request, res: Response) => {


    const categoriaNome: string = String("palestra")
    const listarTeatros = await prisma.categoria.findFirst({
        where: {
            nome: categoriaNome
        }
    }).then(async (sucesso) => {


        if (!sucesso) {
            res.json("O nome da categoria não pode ser nulo")
            console.log(sucesso)
        } else {


            const listarEventosTeatros = await prisma.evento.findMany({
                where: {
                    categoriaId: sucesso.id,
                    aprovado: true,
                    publicado: true,
                    banido: false,
                }, include: {
                    bilhete: {
                        include: {
                            evento: {
                                include: {
                                    bilhete: true
                                }
                            }
                        },
                        take: 1
                    }
                },
                orderBy: {
                    at_create: "desc"
                }
            }).then((evento) => {

                if (evento.map(item => {
                    if (item.dataInicio.getDate() === diaAtual && item.dataInicio.getMonth() === mesAtual && item.dataInicio.getFullYear() === anoAtual) {


                        prisma.evento.update({
                            where: {
                                id: item.id
                            },
                            data: {
                                estado: "ADECORRER"
                            }
                        }).then((sucessoEventoDecorrendo) => {
                            console.log("Evento decorrendo", sucessoEventoDecorrendo)
                        })



                    } else if (item.dataInicio.getDate() < diaAtual && item.dataInicio.getMonth() < mesAtual && item.dataInicio.getFullYear() < anoAtual) {

                        prisma.evento.update({
                            where: {
                                id: item.id
                            },
                            data: {
                                estado: "FINALIZADO"
                            }
                        }).then((sucessoEvento) => {
                            console.log("Evento terminado", sucessoEvento)
                        })

                    } else {
                        console.log("Evento desponivel")
                    }
                }))
                    res.json(evento)

            }).catch((error) => {
                console.log(error)
                res.json(error)
            })


        }


    }).catch((error) => {
        res.json(error)
        console.log(error)
    })

}
