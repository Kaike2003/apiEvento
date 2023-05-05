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
exports.InformacaoEventoParticipante = void 0;
const prisma_1 = require("../../../prisma");
const InformacaoEventoParticipante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idBilhete, idUtilizador } = req.params;
    const verificarUtilizador = yield prisma_1.prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    }).then((sucessoUtilizador) => __awaiter(void 0, void 0, void 0, function* () {
        if (!sucessoUtilizador) {
            res.status(400).json("Id nulo utilizador");
        }
        else {
            const VerificarBilhete = yield prisma_1.prisma.bilhete.findFirst({
                where: {
                    id: idBilhete
                }
            }).then((sucessoBilhete) => __awaiter(void 0, void 0, void 0, function* () {
                if (!sucessoBilhete) {
                    res.status(400).json("Id nulo bilhete");
                }
                else {
                    yield prisma_1.prisma.evento.findFirst({
                        where: {
                            bilhete: {
                                some: {
                                    evento: {
                                        id: sucessoBilhete.eventoId
                                    }
                                }
                            }
                        }
                    }).then((sucessoEvento) => {
                        if (!sucessoEvento) {
                            res.status(400).json(("Valor nulo evento"));
                        }
                        else {
                            res.json(sucessoEvento);
                            console.log(sucessoEvento);
                        }
                    }).catch((error) => {
                        res.status(400).json(error);
                        console.log(error);
                    });
                }
            })).catch((error) => {
                res.status(400).json(error);
                console.log(error);
            });
        }
    })).catch((error) => {
        res.status(400).json(error);
        console.log(error);
    });
});
exports.InformacaoEventoParticipante = InformacaoEventoParticipante;
