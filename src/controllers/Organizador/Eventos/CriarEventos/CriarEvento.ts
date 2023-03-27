import { Request, Response } from "express";
import { prisma } from "../../../../prisma";
import { EventoType, EventoOmit, Hora_Data_Validacao, Validacao, VerificaoExiste_Evento } from "../../../../validation";


export const CriarEvento = async (req: Request, res: Response) => {

    const { nome, descricao, localizacao, hora, foto, dataTermino, dataInicio }: EventoType = req.body

    const { estado, utilizadorId, categoriaId }: Validacao = req.body

    const valor_Req_Body = [nome, categoriaId, utilizadorId, descricao, localizacao, hora, dataInicio, dataTermino]

    const hora_Data_Validacao: Hora_Data_Validacao = {
        horaInicio: "00:00:00",
        horaTermino: "23:59:59",
        dataValidaAnual: "2023/12/31",
        horaEvento: new Date(`${dataInicio} ${hora}`)
    }

    const verificaoExiste_evento: VerificaoExiste_Evento = {
        ExisteCategoria: await prisma.categoria.count(),
        ExisteTipoBilhete: await prisma.tipoBilhete.count(),
        ExisteUtilizador: await prisma.utilizador.count(),
        ExisteUtilizadorId: await prisma.utilizador.findFirst({
            where: {
                id: utilizadorId
            }
        }),
        ExistEvento: await prisma.evento.findFirst({
            where: {
                nome: nome
            }
        })
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

                        if (verificaoExiste_evento.ExisteCategoria === 0) {
                            res.status(400).json("[Aviso!], Não existe uma categoria cadastrada")
                        } else if (verificaoExiste_evento.ExisteTipoBilhete === 0) {
                            res.status(400).json("[Aviso!], Não existe uma tipo de bilhete cadastrado")
                        } else if (verificaoExiste_evento.ExisteUtilizador === 0) {
                            res.status(400).json("[Aviso!], Não existe um Organizador de evento cadastrado")
                        } else {

                            if (verificaoExiste_evento.ExisteUtilizadorId?.id === Number(utilizadorId)) {
                                if (verificaoExiste_evento.ExistEvento?.nome === nome) {
                                    res.status(400).json("Aviso! Já existe um evento com esse nome")
                                } else {

                                    const result = EventoOmit.parse({
                                        nome: nome,
                                        descricao: descricao,
                                        localizacao: localizacao,
                                        dataInicio: new Date(dataInicio),
                                        dataTermino: new Date(dataTermino),
                                        hora: hora,
                                        foto: foto
                                    })

                                    const criarEvento = await prisma.evento.create({
                                        data: {
                                            nome: result.nome,
                                            estado: estado,
                                            foto: String(result.foto),
                                            descricao: result.descricao,
                                            localizacao: result.localizacao,
                                            hora: (new Date(`${dataInicio} ${hora}`)),
                                            dataInicio: new Date(`${dataInicio}`),
                                            dataTermino: new Date(`${dataTermino}`),
                                            categoriaId: categoriaId,
                                            utilizadorId: utilizadorId,
                                            publicado: false
                                        }
                                    }).then((sucesso) => {

                                        res.json({
                                            "Sucesso": sucesso,
                                            "Body": req.body, valor_Req_Body
                                        })

                                        console.log({
                                            "Sucesso": sucesso,
                                            "Body": req.body, valor_Req_Body
                                        })

                                    }).catch((error) => {

                                        res.status(400).json({
                                            "mensagem": error,
                                        })

                                        console.log({
                                            "mensagem": error,
                                        })

                                    })

                                }

                            } else {

                                res.status(400).json(`[Aviso!], Não existe um utilizador com esse id ${utilizadorId}`)

                                console.log(`[Aviso!], Não existe um utilizador com esse id ${utilizadorId}`)

                            }

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

    // res.json({ Body: req.body, File: req.file }) 

}
