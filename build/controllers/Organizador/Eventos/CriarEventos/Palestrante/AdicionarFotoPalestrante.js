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
exports.AdicionarFotoPalestrante = void 0;
const prisma_1 = require("../../../../../prisma");
const AdicionarFotoPalestrante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { idEvento, idPalestrante } = req.params;
    const foto = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    try {
        const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
            where: {
                id: idEvento
            }
        });
        const verificarIdPalestrante = yield prisma_1.prisma.palestrante.findFirst({
            where: {
                id: idPalestrante
            }
        });
        if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento && (verificarIdPalestrante === null || verificarIdPalestrante === void 0 ? void 0 : verificarIdPalestrante.id) === idPalestrante) {
            const adicionarFotoPalestrante = yield prisma_1.prisma.palestrante_Evento.update({
                where: {
                    palestranteId_eventoId: {
                        eventoId: verificarIdEventoExiste.id,
                        palestranteId: verificarIdPalestrante.id
                    }
                },
                data: {
                    palestrante: {
                        update: {
                            foto: String(foto)
                        }
                    }
                }
            }).then((sucesso) => {
                res.json(sucesso);
            }).catch((error) => {
                res.json({
                    error: {
                        "code": "P2025",
                        "clientVersion": "4.8.0",
                        "meta": {
                            "cause": "Nenhum registro 'Palestrante' foi encontrado para uma atualização aninhada na relação 'PalestranteToPalestrante_Evento'."
                        }
                    }
                });
            });
        }
        else {
            res.json({
                "Verifique o id do evento": idEvento,
                "Verifique o id do palestrante": idPalestrante
            });
        }
    }
    catch (error) {
        res.json({
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
exports.AdicionarFotoPalestrante = AdicionarFotoPalestrante;
