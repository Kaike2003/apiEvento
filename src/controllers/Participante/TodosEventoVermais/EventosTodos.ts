import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const EventosTodosVermais = async (req: Request, res: Response) => {


    const diaAtual = new Date().getDate()
    const mesAtual = new Date().getMonth()
    const anoAtual = new Date().getFullYear()

    const listarTodosEventos = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: true,
            OR: [
                { estado: "DESPONIVEL" },
                { estado: "ADECORRER" },
                { estado: "CANCELADO" }
            ]
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
        }

    }).then((evento) => {

        if (evento.map(item => {
            if (
                item.dataInicio.getDate() === diaAtual
                &&
                item.dataInicio.getMonth() === mesAtual
                &&
                item.dataInicio.getFullYear() === anoAtual) {

                console.log("Evento decorrendo")


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



            } else if (item.dataInicio.getDate() <= diaAtual && item.dataInicio.getMonth() <= mesAtual && item.dataInicio.getFullYear() <= anoAtual) {

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


        // res.json(evento)
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })


}