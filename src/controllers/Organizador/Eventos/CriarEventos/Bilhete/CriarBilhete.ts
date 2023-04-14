import { Evento } from "@prisma/client"
import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"
import { BilheteOmit, BilheteType, QueryParams } from "../../../../../validation"


export const CriarBilhete = async (req: Request, res: Response) => {

    const { idEvento }: QueryParams = req.params

    const {
        nome,
        preco,
        horaInicio,
        horaTermino,
        dataInicio,
        dataTermino,
        quantidade,
        tipoEvento
    }: BilheteType = req.body

    const result = BilheteOmit.parseAsync({
        nome: nome,
        preco: preco,
        quantidade: quantidade,
        tipoEvento: tipoEvento,
        dataInicio: new Date(dataInicio),
        dataTermino: new Date(dataTermino),
        horaInicio: new Date(`${dataInicio} ${horaInicio}`),
        horaTermino: new Date(`${dataTermino} ${horaTermino}`),
    })

    const valores_Req_Body: (String | Number | Date)[] = [
        nome,
        preco,
        horaInicio,
        horaTermino,
        dataInicio,
        dataTermino,
        quantidade,
        tipoEvento]


    const verificarIdEvento: Evento | null = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    if (
        verificarIdEvento?.id === idEvento
        &&
        verificarIdEvento.banido === false
    ) {

        // if (
        //     verificarIdEvento.dataInicio.getDate() > (await result).dataInicio.getDate()
        //     &&
        //     verificarIdEvento.dataInicio.getDate() >= (await result).dataTermino.getDate()
        //     &&
        //     verificarIdEvento.dataInicio.getDate() !== (await result).dataInicio.getDate()
        //     && (await result).dataTermino > (await result).dataInicio
        //     && (await result).dataInicio.getMonth() <= verificarIdEvento.dataInicio.getMonth()
        //     && (await result).dataTermino.getMonth() <= verificarIdEvento.dataTermino.getMonth()
        // ) {

            const criarBilhete = await prisma.bilhete.create({
                data: {
                    nome: (await result).nome,
                    preco: (await result).preco,
                    horaInicio: (await result).horaInicio,
                    horaTermino: (await result).horaTermino,
                    dataInicio: (await result).dataInicio,
                    dataTermino: (await result).dataTermino,
                    quantidade: (await result).quantidade,
                    tipoEvento: {
                        connect: {
                            id: (await result).tipoEvento
                        }
                    },
                    evento: {
                        connect: {
                            id: (idEvento)
                        }
                    }
                }
            }).then((sucesso) => {
                res.status(201).json(sucesso)
                console.log("Bilhete criado com sucesso", sucesso)
            }).catch((error) => {
                res.status(400).json(error)
                console.log("Bilhete erro", error)
                console.log("Resultado", { result, valores_Req_Body })
            })



        // } else {
        //     res.json({
        //         "Possiveis erros": {
        //             "Valores vindo do body": valores_Req_Body,
        //             "Data inicio evento": `${verificarIdEvento.dataInicio.getDate()}/${verificarIdEvento.dataInicio.getMonth()}/${verificarIdEvento.dataInicio.getFullYear()}`,
        //             "Data termino evento": `${verificarIdEvento.dataTermino.getDate()}/${verificarIdEvento.dataTermino.getMonth()}/${verificarIdEvento.dataTermino.getFullYear()}`,
        //             "Data inicio bilhete": (await result).dataInicio.getDate(),
        //             "Data termino bilhete": (await result).dataTermino.getDate(),

        //             "Teste de validação": verificarIdEvento.dataInicio.getDate() > (await result).dataInicio.getDate()
        //                 &&
        //                 verificarIdEvento.dataInicio.getDate() >= (await result).dataTermino.getDate()
        //                 &&
        //                 verificarIdEvento.dataInicio.getDate() !== (await result).dataInicio.getDate()
        //                 && (await result).dataTermino > (await result).dataInicio
        //         }

        //     })

        // }



    } else {
        if (!verificarIdEvento) {
            res.json({ "Evento nulo kk": verificarIdEvento })
        } else {
            res.json({
                "Id não existe ou evento não existe": idEvento,
            })

        }
    }

}