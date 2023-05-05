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
exports.ApagarPalestrante = void 0;
const prisma_1 = require("../../../../../prisma");
const ApagarPalestrante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento, idPalestrante } = req.params;
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
            const apagarRelacaoPalestranteID = yield prisma_1.prisma.palestrante_Evento.delete({
                where: {
                    palestranteId_eventoId: {
                        palestranteId: idPalestrante,
                        eventoId: idEvento
                    }
                }
            }).then((sucesso) => {
                try {
                    const apagarPalestrante = prisma_1.prisma.palestrante.delete({
                        where: {
                            id: idPalestrante,
                        }
                    }).then((sucesso) => {
                        res.status(201).json({ "Palestrante apagado com sucesso": sucesso });
                    }).catch((error) => {
                        res.status(400).json({ "Erro ao tentar apagar o palestrante": error });
                    });
                }
                catch (error) {
                    res.json(error);
                }
            }).catch((error) => {
                res.json({
                    error: {
                        "code": "P2025",
                        "clientVersion": "4.8.0",
                        "meta": {
                            "cause": "O registro a ser excluído não existe."
                        }
                    }
                });
            });
        }
        else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do palestrante": idPalestrante
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.ApagarPalestrante = ApagarPalestrante;
