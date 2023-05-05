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
exports.HistoricoEvento = void 0;
const prisma_1 = require("../../../../prisma");
const HistoricoEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUtilizador } = req.params;
    const verificarUtilizadorExiste = yield prisma_1.prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    });
    try {
        if (!verificarUtilizadorExiste) {
            res.json("Valor nulo kk");
        }
        else {
            const historicoEvento = yield prisma_1.prisma.utilizador.findMany({
                where: {
                    id: idUtilizador,
                },
                select: {
                    evento: {
                        where: {
                            utilizadorId: idUtilizador,
                            estado: "FINALIZADO"
                        }
                    }
                }
            }).then((sucesso) => {
                res.json({ "Historico de evento": sucesso });
            }).catch((error) => {
                res.json(error);
            });
        }
    }
    catch (error) {
    }
});
exports.HistoricoEvento = HistoricoEvento;
