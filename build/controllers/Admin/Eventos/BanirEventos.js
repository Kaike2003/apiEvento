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
exports.BanirEventos = void 0;
const prisma_1 = require("../../../prisma");
const BanirEventos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento } = req.params;
    try {
        const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
            where: {
                id: idEvento
            }
        });
        if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento && verificarIdEventoExiste.banido === false) {
            const banirEvento = yield prisma_1.prisma.evento.update({
                where: {
                    id: idEvento
                },
                data: {
                    banido: true,
                    estado: "CANCELADO"
                }
            }).then((sucesso) => {
                res.json(sucesso);
            }).catch((error) => {
                res.json(`Erro banir evento: ${error}`);
            });
        }
        else {
            res.json(`O evento com id ${idEvento} já foi banido`);
        }
    }
    catch (error) {
        res.json({ "Verifique os campos que estás mando {params, file ou body}": error });
    }
});
exports.BanirEventos = BanirEventos;
