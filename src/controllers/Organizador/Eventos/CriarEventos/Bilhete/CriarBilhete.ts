import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
import { BilheteType, BilheteOmit, VerificaoExiste_Bilhete, Hora_Data_Validacao } from "../../../../../validation";


export const CriarBilhete = async (req: Request, res: Response) => {

    const { nome, quantidade, preco, dataInicio, dataTermino }: BilheteType = req.body

    const { IdEvento, IdTipoBilhete } = req.body

    const valor_Req_Body = [nome, quantidade, preco, IdTipoBilhete, IdEvento, dataInicio, dataTermino]

    const hora_Data_Validacao: Hora_Data_Validacao = {
        horaInicio: "00:00:00",
        horaTermino: "23:59:59",
        dataValidaAnual: "2023/12/31",
        horaEvento: new Date(`${dataInicio}`)
    }

    const verificaoExiste_Bilhete: VerificaoExiste_Bilhete = {
        ExisteIdEvento: await prisma.evento.count(),
        ExisteEvento: await prisma.evento.findFirst({
            where: {
                id: Number(IdEvento)
            }
        }),
        ExisteTipoBilheteFindirst: await prisma.tipoBilhete.findFirst({where:{
            id: Number(IdTipoBilhete)
        }}),
        ExisteTipoBilhete: await prisma.tipoBilhete.count()
    }


    // * Validação da data e hora, antes mesmo da valicação do zod. kk

    try {

        if (new Date(dataInicio) >= new Date() && new Date(dataInicio) <= new Date(hora_Data_Validacao.dataValidaAnual) && new Date(dataInicio) <= new Date(dataTermino)) {

            console.log({
                "Informação": "A data de inicio está certa.",
                "Data": new Date(dataInicio)
            })

            if (new Date(dataTermino) >= new Date() &&
                new Date(dataTermino) <= new Date(hora_Data_Validacao.dataValidaAnual)) {

                if (hora_Data_Validacao.horaEvento >= new Date(`${dataInicio} ${hora_Data_Validacao.horaInicio}`) && hora_Data_Validacao.horaEvento <= new Date(`${dataInicio} 
            ${hora_Data_Validacao.horaTermino}`)) {

                    try {

                        try {

                            if (verificaoExiste_Bilhete.ExisteTipoBilhete === 0) {
                                res.status(400).json("[Aviso!], não existe nenhum tipo de bilhete cadastrado")
                                console.log("[Aviso!], não existe nenhum tipo de bilhete cadastrado")
                            } else if (verificaoExiste_Bilhete.ExisteIdEvento === 0) {
                                res.status(400).json("[Aviso!], não existe nenhum id de evento cadastrado")
                                console.log("[Aviso!], não existe nenhum id de evento cadastrado")
                            }
                            else {

                                if (verificaoExiste_Bilhete.ExisteEvento?.id === Number(IdEvento)) {

                                    if (verificaoExiste_Bilhete.ExisteTipoBilheteFindirst?.id === Number(IdTipoBilhete)) {
                                        const Bilhete = await prisma.bilhete.create({
                                            data: {
                                                nome: nome,
                                                quantidade: quantidade,
                                                preco: preco,
                                                dataInicio: new Date(dataInicio),
                                                dataTermino: new Date(dataTermino),
                                                tipoEvento: {
                                                    connect: {
                                                        id: Number(IdTipoBilhete)
                                                    }
                                                },
                                                evento: {
                                                    connect: {
                                                        id: Number(IdEvento)
                                                    }
                                                },

                                            }
                                        }).then((sucesso) => {
                                            res.status(201).json({ "Bilhete criado": sucesso })
                                            console.log({
                                                "Bilhete criado": sucesso, "Body": valor_Req_Body
                                            })
                                        }).catch((error) => {
                                            res.status(400).json(error)
                                        })
                                    } else {
                                        res.status(400).json("[Aviso!], não existe nenhum id de tipo de bilhete cadastrado")
                                        console.log("[Aviso!], não existe nenhum id de tipo de bilhete cadastrado")
                                    }

                                } else {
                                    res.status(400).json("[Aviso!], Esse evento não existe")
                                    console.log("[Aviso!], não existe nenhum id de evento cadastrado")
                                }

                            }


                        } catch (error) {
                            res.status(400).json(error)
                        }

                    } catch (error) {

                        res.json(error)
                        console.log(error)

                    }

                } else {

                    res.json({
                        "Hora_inválida": "Hora inválida",
                        "Hora do evento": hora_Data_Validacao.horaEvento
                    })

                    console.log({
                        "Hora_inválida": "Hora inválida",
                        "Hora do evento": hora_Data_Validacao.horaEvento
                    })

                }

                console.log("Essa data é valida para ser de termino de um evento")

            } else {

                console.log("[Aviso!] Essa data é inválida")

            }

        } else {

            console.log("[Aviso!] Você não pode marcar um evento com a data de inicio no dia atual ou de dia, mês e ano que já se passaram.")

        }

    } catch (error) {

        res.json(error)
        console.log(error)

    }







    // const ExisteIdEvento = await prisma.evento.count()
    // const ExisteEvento = await prisma.evento.findFirst()
    // const ExisteTipoBilheteFindirst = await prisma.tipoBilhete.findFirst()
    // const ExisteTipoBilhete = await prisma.tipoBilhete.count()

    // try {

    //     if (verificaoExiste_Bilhete.ExisteTipoBilhete === 0) {
    //         res.status(400).json("[Aviso!], não existe nenhum tipo de bilhete cadastrado")
    //         console.log("[Aviso!], não existe nenhum tipo de bilhete cadastrado")
    //     } else if (verificaoExiste_Bilhete.ExisteIdEvento === 0) {
    //         res.status(400).json("[Aviso!], não existe nenhum id de evento cadastrado")
    //         console.log("[Aviso!], não existe nenhum id de evento cadastrado")
    //     }
    //     else {

    //         if (verificaoExiste_Bilhete.ExisteEvento?.id === Number(IdEvento)) {

    //             if (verificaoExiste_Bilhete.ExisteTipoBilheteFindirst?.id === Number(IdTipoEvento)) {
    //                 const Bilhete = await prisma.bilhete.create({
    //                     data: {
    //                         nome: nome,
    //                         quantidade: quantidade,
    //                         preco: preco,
    //                         dataInicio: new Date(dataInicio),
    //                         dataTermino: new Date(dataTermino),
    //                         tipoEvento: {
    //                             connect: {
    //                                 id: Number(IdTipoEvento)
    //                             }
    //                         },
    //                         evento: {
    //                             connect: {
    //                                 id: Number(IdEvento)
    //                             }
    //                         },

    //                     }
    //                 }).then((sucesso) => {
    //                     res.status(201).json({ "Bilhete criado": sucesso })
    //                     console.log({ "Bilhete criado": sucesso })
    //                 }).catch((error) => {
    //                     res.status(400).json(error)
    //                 })
    //             } else {
    //                 res.status(400).json("[Aviso!], não existe nenhum id de tipo de bilhete cadastrado")
    //                 console.log("[Aviso!], não existe nenhum id de tipo de bilhete cadastrado")
    //             }

    //         } else {
    //             res.status(400).json("[Aviso!], Esse evento não existe")
    //             console.log("[Aviso!], não existe nenhum id de evento cadastrado")
    //         }

    //     }


    // } catch (error) {
    //     res.status(400).json(error)
    // }

}
