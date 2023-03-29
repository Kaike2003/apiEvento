import { Evento, Utilizador } from "@prisma/client"
import { Request, Response } from "express"
import { get } from "http"
import { prisma } from "../../../../prisma"
import { EventoType, EventoOmit, VerificaoExiste_Evento, QueryParams, } from "../../../../validation";




export const EditarEvento = async (req: Request, res: Response) => {


    // {
    //     "nome": "Angolbaaike Aartaaaoalomeu",
    //     "estado": "Desponivel",
    //     "descricao": "O shows do dias dos amores é muito fixé. Tem bons cantores...",
    //     "localizacao": "localizacao",
    //     "hora": "04:15:20",
    //     "dataInicio": "2023-03-28",
    //     "dataTermino": "2023-03-28",
    //     "utilizadorId": 1,
    //     "categoriaId": 1
    // }

    // const { id, idEvento } = req.params
    // const idUtilizador = Number(id)
    // const idUEvento = Number(id)


    // const { nome, descricao, localizacao, hora, dataTermino, dataInicio, categoriaId, estado } = req.body

    // const result: (Number | String)[] = [nome, descricao, localizacao, hora, dataTermino, dataInicio, categoriaId, estado]



    const { idUtilizador, idEvento }: QueryParams = req.params
    

    const {
        nome,
        descricao,
        dataInicio,
        dataTermino,
        horaInicio,
        horaTermino,
        foto,
        provincia,
        municipio,
        bairro,
        categoriaId
    }: EventoType = req.body

    const result = EventoOmit.parse({
        nome: nome,
        descricao: descricao,
        dataInicio: new Date(dataInicio),
        dataTermino: new Date(dataTermino),
        horaInicio: new Date(`${dataInicio} ${horaInicio}`),
        horaTermino: new Date(`${dataTermino} ${horaTermino}`),
        foto: "image.png",
        provincia: provincia,
        municipio: municipio,
        bairro: bairro,
        categoriaId: categoriaId
    })


    const verificarIdEventoExiste: Evento | null = await prisma.evento.findFirst({
        where: {
            id: idEvento,
        }
    })

    const verificarIdUtilizadorExiste: Utilizador | null = await prisma.utilizador.findFirst({
        where: {
            id: idUtilizador
        }
    })





    if (!verificarIdEventoExiste) {

        res.json("olá mundo")

    } else {

        if (verificarIdEventoExiste.dataInicio.getDate() !== new Date().getDate()) {

            try {


                if (
                    verificarIdEventoExiste?.id === idEvento &&
                    verificarIdUtilizadorExiste?.utilizador === "ORGANIZADOR" && verificarIdEventoExiste.banido === false
                ) {

                    const evento = await prisma.utilizador.findFirst({
                        where: {
                            id: idUtilizador
                        },
                        include: {
                            evento: {
                                where: {
                                    id: idEvento
                                }
                            }
                        }

                    }).then((sucesso) => {

                        // res.json({ sucesso, idEvento, idUtilizador })

                        if (null === sucesso) {
                            res.json("Não pode atualizar um evento. Que não tenha um relacionamento com um utilizador.")
                            // res.json(sucesso)
                        } else {

                            const atualizarBilhete = prisma.evento.update({
                                where: {
                                    id: idEvento
                                },
                                data: {
                                    nome: result.nome,
                                    descricao: result.descricao,
                                    dataInicio: result.dataInicio,
                                    dataTermino: result.dataTermino,
                                    estado: "DESPONIVEL",
                                    horaInicio: result.horaInicio,
                                    horaTermino: result.horaTermino,
                                    provincia: result.provincia,
                                    municipio: result.municipio,
                                    bairro: bairro,
                                    banido: false,
                                    publicado: false,
                                    aprovado: false,
                                    foto: "imagem",
                                    categoriaId: categoriaId
                                }
                            }).then((sucesso) => {
                                res.json({ "Bilhete atualizado com sucesso": sucesso })
                            }).catch((error) => {
                                res.json(error)
                            })

                        }

                    }).catch((error) => {
                        res.json(error)
                    })


                } else {
                    res.status(400).json({
                        "Verifique o id do evento ou seu evento foi banido da aplicação.": idEvento,
                        "Verifique o Id do utilizador": idUtilizador
                    })
                }



            } catch (error) {
                res.status(400).json(error)
            }



        } else {
            res.json({ "Não pode editar um evento enquanto está decorrendo.": verificarIdEventoExiste.dataInicio.getDate() })
        }

    }



    // try {


    //     if (
    //         verificarIdEventoExiste?.id === idevento &&
    //         verificarIdUtilizadorExiste?.utilizador === "ORGANIZADOR" && verificarIdEventoExiste.banido === false
    //     ) {

    //         const evento = await prisma.utilizador.findFirst({
    //             where: {
    //                 id: idUtilizador
    //             },
    //             include: {
    //                 evento: {
    //                     where: {
    //                         id: idevento
    //                     }
    //                 }
    //             }

    //         }).then((sucesso) => {

    //             // res.json({ sucesso, idEvento, idUtilizador })

    //             if (null === sucesso) {
    //                 // res.json("Não pode atualizar um evento. Que não tenha um relacionamento com um utilizador.")
    //                 res.json(sucesso)
    //             } else {

    //                 const atualizarBilhete = prisma.evento.update({
    //                     where: {
    //                         id: idevento
    //                     },
    //                     data: {
    //                         nome: nome,
    //                         descricao: descricao,
    //                         dataInicio: new Date(dataInicio),
    //                         dataTermino: new Date(dataTermino),
    //                         estado: estado,
    //                         hora: new Date(`${dataInicio} ${hora}`),
    //                         localizacao: localizacao,
    //                         banido: false,
    //                         publicado: false,
    //                         foto: "imagem",
    //                         utilizadorId: idUtilizador,
    //                         categoriaId: categoriaId
    //                     }
    //                 }).then((sucesso) => {
    //                     res.json({ "Bilhete atualizado com sucesso": sucesso })
    //                 }).catch((error) => {
    //                     res.json(error)
    //                 })

    //             }

    //         }).catch((error) => {
    //             res.json(error)
    //         })


    //     } else {
    //         res.status(400).json({
    //             "Verifique o id do evento ou seu evento foi banido da aplicação.": idevento,
    //             "Verifique o Id do utilizador": idUtilizador
    //         })
    //     }



    // } catch (error) {
    //     res.status(400).json(error)
    // }










    // try {


    //     if (
    //         verificarIdEventoExiste?.id === idevento &&
    //         verificarIdUtilizadorExiste?.utilizador === "ORGANIZADOR" && verificarIdEventoExiste.banido === false
    //     ) {

    //         const evento = await prisma.utilizador.findFirst({
    //             where: {
    //                 id: idUtilizador
    //             },
    //             include: {
    //                 evento: {
    //                     where: {
    //                         id: idevento
    //                     }
    //                 }
    //             }

    //         }).then((sucesso) => {

    //             // res.json({ sucesso, idEvento, idUtilizador })

    //             if (null === sucesso) {
    //                 // res.json("Não pode atualizar um evento. Que não tenha um relacionamento com um utilizador.")
    //                 res.json(sucesso)
    //             } else {

    //                 const atualizarBilhete = prisma.evento.update({
    //                     where: {
    //                         id: idevento
    //                     },
    //                     data: {
    //                         nome: nome,
    //                         descricao: descricao,
    //                         dataInicio: new Date(dataInicio),
    //                         dataTermino: new Date(dataTermino),
    //                         estado: estado,
    //                         hora: new Date(`${dataInicio} ${hora}`),
    //                         localizacao: localizacao,
    //                         banido: false,
    //                         publicado: false,
    //                         foto: "imagem",
    //                         utilizadorId: idUtilizador,
    //                         categoriaId: categoriaId
    //                     }
    //                 }).then((sucesso) => {
    //                     res.json({ "Bilhete atualizado com sucesso": sucesso })
    //                 }).catch((error) => {
    //                     res.json(error)
    //                 })

    //             }

    //         }).catch((error) => {
    //             res.json(error)
    //         })


    //     } else {
    //         res.status(400).json({
    //             "Verifique o id do evento ou seu evento foi banido da aplicação.": idevento,
    //             "Verifique o Id do utilizador": idUtilizador
    //         })
    //     }



    // } catch (error) {
    //     res.status(400).json(error)
    // }








    // try {




    //     const verificarUtilizadorExiste = await prisma.utilizador.findFirst({
    //         where: {
    //             id: idUtilizador
    //         }
    //     })

    //     if (
    //         verificarUtilizadorExiste?.id === idUtilizador && verificarUtilizadorExiste.utilizador === "ORGANIZADOR" && verificarIdEventoExiste?.banido === false) {

    //         const criarEvento = await prisma.evento.update({
    //             where: {
    //                 id: idevento
    //             },
    //             data: {
    //                 nome: nome,
    //                 descricao: descricao,
    //                 dataInicio: new Date(dataInicio),
    //                 dataTermino: new Date(dataTermino),
    //                 estado: estado,
    //                 hora: new Date(`${dataInicio} ${hora}`),
    //                 localizacao: localizacao,
    //                 banido: false,
    //                 publicado: false,
    //                 foto: "imagem",
    //                 categoriaId: categoriaId
    //             }
    //         }).then((sucesso) => {
    //             res.json(sucesso)
    //         }).catch((error) => {
    //             res.json(error)
    //         })

    //     } else {
    //         res.json("Essa conta não é de organizador. Não pode criar evento ou seu evento foi banido")
    //     }

    // } catch (error) {
    //     res.json({ "Erro criar evento": error })
    // }



}