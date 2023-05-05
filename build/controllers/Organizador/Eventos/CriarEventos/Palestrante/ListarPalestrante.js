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
exports.ListarPalestrante = void 0;
const prisma_1 = require("../../../../../prisma");
const ListarPalestrante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento } = req.params;
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    });
    try {
        if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento) {
            const listarPalestrante = yield prisma_1.prisma.palestrante.findMany({
                where: {
                    evento: {
                        some: {
                            eventoId: idEvento
                        }
                    }
                }
            }).then((sucesso) => {
                res.status(200).json(sucesso);
            }).catch((error) => {
                res.status(400).json(error);
            });
        }
        else {
            res.status(400).json({
                "Verifique o id do evento": idEvento
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.ListarPalestrante = ListarPalestrante;
