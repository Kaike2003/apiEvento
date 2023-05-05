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
exports.ApagarBilhete = void 0;
const prisma_1 = require("../../../../../prisma");
const ApagarBilhete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento, idBilhete } = req.params;
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento,
        }
    });
    const verificarIdBilheteExiste = yield prisma_1.prisma.bilhete.findFirst({
        where: {
            id: idBilhete,
        }
    });
    try {
        if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento && (verificarIdBilheteExiste === null || verificarIdBilheteExiste === void 0 ? void 0 : verificarIdBilheteExiste.id) === idBilhete) {
            const evento = yield prisma_1.prisma.evento.findFirst({
                where: {
                    id: idEvento,
                    bilhete: {
                        some: {
                            id: idBilhete
                        }
                    }
                },
                include: {
                    bilhete: {
                        where: {
                            id: idBilhete
                        }
                    }
                }
            }).then((sucesso) => {
                if (null === sucesso) {
                    // res.json(sucesso)
                    res.json("Não pode excluir um bilhete. Que não tenha um relacionamento com um evento.");
                }
                else {
                    const apagarBilhete = prisma_1.prisma.bilhete.delete({
                        where: {
                            id: idBilhete
                        }
                    }).then((sucesso) => {
                        res.json({ "Bilhete apagado com sucesso": sucesso });
                    }).catch((error) => {
                        res.json(error);
                    });
                }
            }).catch((error) => {
                res.json(error);
            });
        }
        else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do bilhete": idBilhete
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.ApagarBilhete = ApagarBilhete;
