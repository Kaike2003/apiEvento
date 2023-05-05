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
exports.BilheteHistorico = void 0;
const prisma_1 = require("../../../prisma");
const BilheteHistorico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUtilizador } = req.params;
    const verificarUtilizador = yield prisma_1.prisma.utilizador.findFirst({
        where: {
            id: idUtilizador,
            compra: {
                every: {
                    utilizadorId: idUtilizador
                }
            }
        }
    }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
        if (!sucesso) {
            res.json("valor nulo");
        }
        else {
            // res.json(sucesso.id)
            const historicoBilhete = yield prisma_1.prisma.compra.findMany({
                where: {
                    utilizadorId: sucesso.id,
                    pagamento: true
                },
                include: {
                    item_Bilhte: {
                        where: {
                            compra: {
                                utilizadorId: sucesso.id,
                            }
                        },
                        include: {
                            bilhete: {
                                select: {
                                    id: true,
                                    eventoId: true
                                }
                            }
                        }
                    }
                }
            }).then((sucessoHistoricoBilhete) => __awaiter(void 0, void 0, void 0, function* () {
                res.json(sucessoHistoricoBilhete);
            })).catch((error) => {
                res.json(error);
            });
        }
    })).catch((error) => {
        res.json(error);
    });
});
exports.BilheteHistorico = BilheteHistorico;
