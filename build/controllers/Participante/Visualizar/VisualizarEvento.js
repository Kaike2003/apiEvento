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
exports.VisualizarEvento = void 0;
const prisma_1 = require("../../../prisma");
const VisualizarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento } = req.params;
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findUnique({
        where: {
            id: idEvento
        }
    });
    try {
        if (!verificarIdEventoExiste) {
            res.json("Id nulo");
        }
        else {
            const exibirTodasInformacoesEvento = yield prisma_1.prisma.evento.findFirst({
                where: {
                    id: idEvento,
                    publicado: true,
                    aprovado: true,
                    banido: false,
                },
                include: {
                    bilhete: {
                        select: {
                            id: true,
                            nome: true,
                            quantidade: true,
                            tipoEvento: true,
                            dataInicio: true,
                            dataTermino: true,
                            horaInicio: true,
                            horaTermino: true
                        },
                        where: {
                            eventoId: idEvento
                        }
                    },
                    orador: {
                        select: {
                            orador: {
                                select: {
                                    nome: true
                                }
                            }
                        },
                        where: {
                            eventoId: idEvento
                        }
                    }
                }
            }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
                const eventoVisualizacao = yield prisma_1.prisma.evento.findUnique({
                    where: {
                        id: idEvento
                    }
                }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!sucesso) {
                        res.json("Valor nulo");
                    }
                    else {
                        const atualizarVisualizacao = yield prisma_1.prisma.evento.update({
                            where: {
                                id: idEvento
                            },
                            data: {
                                visualizacao: sucesso.visualizacao + 1
                            }
                        });
                    }
                }));
                res.json(sucesso);
                console.log("Informações do evento", sucesso);
            })).catch((error) => {
                res.json(error);
            });
        }
    }
    catch (error) {
        res.json({ "Erro visualizar bilhete": error });
    }
});
exports.VisualizarEvento = VisualizarEvento;
