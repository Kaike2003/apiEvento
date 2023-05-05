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
exports.AtualizarOrador = void 0;
const prisma_1 = require("../../../../../prisma");
prisma_1.prisma;
const AtualizarOrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento, idOrador } = req.params;
    const { nome } = req.body;
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    });
    const verificarIdOradorExiste = yield prisma_1.prisma.orador.findFirst({
        where: {
            id: idOrador
        }
    });
    try {
        if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento && (verificarIdOradorExiste === null || verificarIdOradorExiste === void 0 ? void 0 : verificarIdOradorExiste.id) === idOrador) {
            const atualizarOradorID = yield prisma_1.prisma.orador_Evento.update({
                where: {
                    oradorId_eventoId: {
                        eventoId: verificarIdEventoExiste.id,
                        oradorId: verificarIdOradorExiste.id
                    }
                }, data: {
                    orador: {
                        update: {
                            nome: nome,
                        }
                    }
                },
                select: {
                    orador: true,
                    evento: true
                }
            }).then((sucesso) => {
                res.status(200).json({ "Atualização feita com sucesso": sucesso });
            }).catch((error) => {
                res.status(400).json(error);
            });
        }
        else {
            res.json({
                "Verifique o id do evento": idEvento,
                "Verifique o id do palestrante.": idOrador
            });
        }
    }
    catch (error) {
        res.status(400).json({
            error: {
                "code": "P2025",
                "clientVersion": "4.8.0",
                "meta": {
                    "cause": "Nenhum registro 'Orador' foi encontrado para uma atualização aninhada na relação 'OradorToOrador_Evento'."
                }
            }
        });
    }
    // const verificarIdEventoExiste = await prisma.evento.findFirst({
    //     where: {
    //         id: idEvento
    //     }
    // })
    // const verificarIdPalestranteExiste = await prisma.orador.findFirst({
    //     where: {
    //         id: idOradorAtualizar
    //     }
    // })
    // try {
    //     if (verificarIdEventoExiste?.id === idEvento && verificarIdPalestranteExiste?.id === idOradorAtualizar) {
    //         const atualizarPalestrante = await prisma.orador.update({
    //             where: {
    //                 id: idOradorAtualizar
    //             },
    //             data: {
    //                 nome: nome
    //             }
    //         }).then((sucesso) => {
    //             res.json({ "Sucesso": sucesso })
    //         }).catch((error) => {
    //             res.json({ "Erro atualizar orador": error })
    //         })
    //     } else {
    //         res.status(400).json({
    //             "Verifique o id do evento": idEvento,
    //             "Verifique o Id do orador": idOradorAtualizar
    //         })
    //     }
    // } catch (error) {
    //     res.status(400).json(error)
    // }
});
exports.AtualizarOrador = AtualizarOrador;
