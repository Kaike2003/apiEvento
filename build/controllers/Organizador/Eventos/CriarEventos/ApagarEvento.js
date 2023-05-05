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
exports.ApagarEvento = void 0;
const prisma_1 = require("../../../../prisma");
const ApagarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUtilizador, idEvento } = req.params;
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findUnique({
        where: {
            id: String(idEvento),
        }
    }).then((sucessoEvento) => __awaiter(void 0, void 0, void 0, function* () {
        if (!sucessoEvento) {
            res.json({ "Dados nulo": sucessoEvento });
        }
        else {
            const verificarIdUtilizadorExiste = yield prisma_1.prisma.utilizador.findUnique({
                where: {
                    id: String(idUtilizador)
                }
            }).then((sucessoUtilizador) => __awaiter(void 0, void 0, void 0, function* () {
                if (!sucessoUtilizador) {
                    res.json({ "Dados nulo": sucessoUtilizador });
                }
                else {
                    if ((sucessoEvento === null || sucessoEvento === void 0 ? void 0 : sucessoEvento.estado) === "DESPONIVEL"
                        &&
                            (sucessoEvento === null || sucessoEvento === void 0 ? void 0 : sucessoEvento.utilizadorId) === (sucessoUtilizador === null || sucessoUtilizador === void 0 ? void 0 : sucessoUtilizador.id)
                        &&
                            (sucessoUtilizador === null || sucessoUtilizador === void 0 ? void 0 : sucessoUtilizador.utilizador) === "ORGANIZADOR") {
                        const apagarBilhetes = yield prisma_1.prisma.bilhete.findMany({
                            where: {
                                eventoId: sucessoEvento.id
                            }
                        }).then((sucessoBilhete) => __awaiter(void 0, void 0, void 0, function* () {
                            sucessoBilhete.map((itemBilhetes) => __awaiter(void 0, void 0, void 0, function* () {
                                yield prisma_1.prisma.bilhete.findUnique({
                                    where: {
                                        id: itemBilhetes.id
                                    }
                                }).then((sucessoBilheteSelecionado) => __awaiter(void 0, void 0, void 0, function* () {
                                    yield prisma_1.prisma.bilhete.delete({
                                        where: {
                                            id: sucessoBilheteSelecionado === null || sucessoBilheteSelecionado === void 0 ? void 0 : sucessoBilheteSelecionado.id
                                        }
                                    }).then(() => {
                                        res.status(200);
                                        console.log("Bilhete apagado com sucesso");
                                    }).catch(error => {
                                        res.status(400);
                                        console.log(error);
                                    });
                                })).catch((error) => {
                                    res.status(400).json(error);
                                    console.log(error);
                                });
                            }));
                        })).catch((error) => {
                            res.status(400);
                            console.log(error);
                        });
                        const apagarOradores = yield prisma_1.prisma.orador_Evento.findMany({
                            where: {
                                eventoId: sucessoEvento.id
                            }
                        }).then((sucessoOradores) => {
                            sucessoOradores.map((itemOradores) => __awaiter(void 0, void 0, void 0, function* () {
                                yield prisma_1.prisma.orador.findUnique({
                                    where: {
                                        id: itemOradores.oradorId
                                    }
                                }).then((sucesssoOradoresSelecionado) => __awaiter(void 0, void 0, void 0, function* () {
                                    yield prisma_1.prisma.orador_Evento.delete({
                                        where: {
                                            oradorId_eventoId: {
                                                eventoId: sucessoEvento.id,
                                                oradorId: itemOradores.oradorId
                                            }
                                        }
                                    }).then((sucessoOradoresApagado) => {
                                        res.status(200);
                                        console.log("Oradores apagados", sucessoOradoresApagado);
                                    }).catch((error) => {
                                        res.status(400);
                                        console.log(error);
                                    });
                                }));
                            }));
                        }).catch((error) => {
                            res.status(400);
                            console.log(error);
                        });
                        const apagarPalestrante = yield prisma_1.prisma.palestrante_Evento.findMany({
                            where: {
                                eventoId: sucessoEvento.id
                            }
                        }).then((sucessoPalestrantes) => {
                            sucessoPalestrantes.map((itemPalestrantes) => __awaiter(void 0, void 0, void 0, function* () {
                                yield prisma_1.prisma.palestrante.findUnique({
                                    where: {
                                        id: itemPalestrantes.palestranteId
                                    }
                                }).then((sucesssoPalestrantesSelecionado) => __awaiter(void 0, void 0, void 0, function* () {
                                    yield prisma_1.prisma.palestrante_Evento.delete({
                                        where: {
                                            palestranteId_eventoId: {
                                                eventoId: sucessoEvento.id,
                                                palestranteId: itemPalestrantes.palestranteId
                                            }
                                        }
                                    }).then((sucessoPalestrantesApagado) => {
                                        res.status(200);
                                        console.log("Palestrantes apagados", sucessoPalestrantesApagado);
                                    }).catch((error) => {
                                        res.status(400);
                                        console.log(error);
                                    });
                                }));
                            }));
                        }).catch((error) => {
                            res.status(400).json(error);
                        });
                        console.log("Id do evento", sucessoEvento.id);
                        const apagarEvento = yield prisma_1.prisma.evento.delete({
                            where: {
                                id: sucessoEvento.id
                            }
                        }).then((sucessoEventoApagado) => {
                            res.status(200).json({ "Evento apagado": sucessoEventoApagado });
                            console.log("Evento apagado", sucessoEventoApagado);
                        }).catch((error) => {
                            res.status(400);
                            console.log(error);
                        });
                    }
                    else {
                        res.status(400).json("Não podes excluir esse evento.");
                        console.log("Não podes excluir esse evento.");
                    }
                }
            }));
        }
    })).catch((error) => {
        res.status(400).json(error);
    });
});
exports.ApagarEvento = ApagarEvento;
