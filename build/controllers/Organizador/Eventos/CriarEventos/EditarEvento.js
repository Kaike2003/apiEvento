"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditarEvento = void 0;
const prisma_1 = require("../../../../prisma");
const validation_1 = require("../../../../validation");
const EditarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const { idUtilizador, idEvento } = req.params;
    const { nome, descricao, dataInicio, dataTermino, horaInicio, horaTermino, foto, provincia, municipio, bairro, categoriaId } = req.body;
    const result2 = [
        idUtilizador
    ];
    console.log(idUtilizador, idEvento);
    const result = validation_1.EventoOmit.parse({
        nome: nome,
        descricao: descricao,
        dataInicio: new Date(dataInicio),
        dataTermino: new Date(dataTermino),
        horaInicio: new Date(`${dataInicio} ${horaInicio}`),
        horaTermino: new Date(`${dataTermino} ${horaTermino}`),
        foto: foto,
        provincia: provincia,
        municipio: municipio,
        bairro: bairro,
        categoriaId: categoriaId
    });
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento,
        }
    });
    const verificarIdUtilizadorExiste = yield prisma_1.prisma.utilizador.findFirst({
        where: {
            id: idUtilizador
        }
    });
    if (verificarIdEventoExiste === null) {
        res.json({ "valor nulo": verificarIdEventoExiste, });
    }
    else {
        if (verificarIdEventoExiste.dataInicio.getDate() !== new Date().getDate()) {
            try {
                if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento &&
                    (verificarIdUtilizadorExiste === null || verificarIdUtilizadorExiste === void 0 ? void 0 : verificarIdUtilizadorExiste.utilizador) === "ORGANIZADOR" && verificarIdEventoExiste.banido === false) {
                    const evento = yield prisma_1.prisma.utilizador.findFirst({
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
                            res.json("Não pode atualizar um evento. Que não tenha um relacionamento com um utilizador.");
                            // res.json(sucesso)
                        }
                        else {
                            const atualizarBilhete = prisma_1.prisma.evento.update({
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
                                    publicado: true,
                                    aprovado: true,
                                    foto: result.foto,
                                    categoriaId: categoriaId
                                }
                            }).then((sucesso) => {
                                res.json({ "Evento atualizado com sucesso": sucesso });
                                console.log(sucesso);
                            }).catch((error) => {
                                res.json(error);
                            });
                        }
                    }).catch((error) => {
                        res.json(error);
                        console.log(error);
                    });
                }
                else {
                    res.status(400).json({
                        "Verifique o id do evento ou seu evento foi banido da aplicação.": idEvento,
                        "Verifique o Id do utilizador": idUtilizador
                    });
                }
            }
            catch (error) {
                res.status(400).json(error);
                console.log(error);
            }
        }
        else {
            res.json({ "Não pode editar um evento enquanto está decorrendo.": verificarIdEventoExiste.dataInicio.getDate() });
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
});
exports.EditarEvento = EditarEvento;
