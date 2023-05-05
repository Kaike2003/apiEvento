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
exports.AtualizarPalestrante = void 0;
const prisma_1 = require("../../../../../prisma");
prisma_1.prisma;
const AtualizarPalestrante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento, idPalestrante } = req.params;
    const { nome, blog } = req.body;
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    });
    const verificarIdPalestranteExiste = yield prisma_1.prisma.palestrante.findFirst({
        where: {
            id: idPalestrante
        }
    });
    try {
        if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento && (verificarIdPalestranteExiste === null || verificarIdPalestranteExiste === void 0 ? void 0 : verificarIdPalestranteExiste.id) === idPalestrante) {
            const adicionarFotoPalestrante = yield prisma_1.prisma.palestrante_Evento.update({
                where: {
                    palestranteId_eventoId: {
                        eventoId: verificarIdEventoExiste.id,
                        palestranteId: verificarIdPalestranteExiste.id
                    }
                }, data: {
                    palestrante: {
                        update: {
                            nome: nome,
                            blog: blog
                        }
                    }
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
                "Verifique o id do palestrante.": idPalestrante
            });
        }
    }
    catch (error) {
        res.status(400).json({
            error: {
                "code": "P2025",
                "clientVersion": "4.8.0",
                "meta": {
                    "cause": "Nenhum registro 'Palestrante' foi encontrado para uma atualização aninhada na relação 'PalestranteToPalestrante_Evento'."
                }
            }
        });
    }
});
exports.AtualizarPalestrante = AtualizarPalestrante;
