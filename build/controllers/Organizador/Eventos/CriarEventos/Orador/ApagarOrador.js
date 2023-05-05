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
exports.ApagarOrador = void 0;
const prisma_1 = require("../../../../../prisma");
const ApagarOrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento, idOrador } = req.params;
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
            const apagarRelacaoOradorID = yield prisma_1.prisma.orador_Evento.delete({
                where: {
                    oradorId_eventoId: {
                        oradorId: idOrador,
                        eventoId: idEvento
                    }
                }
            }).then((sucesso) => {
                try {
                    const apagarOrador = prisma_1.prisma.orador.delete({
                        where: {
                            id: idOrador,
                        }
                    }).then((sucesso) => {
                        res.status(201).json({ "Orador apagado com sucesso": sucesso });
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
                "Verifique o Id do orador": idOrador
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.ApagarOrador = ApagarOrador;
