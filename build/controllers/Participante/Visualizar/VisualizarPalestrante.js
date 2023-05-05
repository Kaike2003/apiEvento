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
exports.VisualiarPalestrante = void 0;
const prisma_1 = require("../../../prisma");
const VisualiarPalestrante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento } = req.params;
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    });
    try {
        if (!verificarIdEventoExiste) {
            res.json("Valor nulo kk");
        }
        else {
            if (verificarIdEventoExiste.id === idEvento) {
                // res.json("Tudo funcionando")
                const listarPalestranteDeumEvento = yield prisma_1.prisma.evento.findFirst({
                    where: {
                        id: idEvento
                    },
                    select: {
                        palestrante: {
                            include: {
                                palestrante: {
                                    select: {
                                        id: true,
                                        nome: true
                                    }
                                }
                            }
                        }
                    }
                }).then((sucesso) => {
                    res.json({ "Lista de palestrante ": sucesso });
                }).catch((error) => {
                    res.json(error);
                });
            }
            else {
                res.json("Erro!");
            }
        }
    }
    catch (error) {
        res.json({ "Visualizar palestrante": error });
    }
});
exports.VisualiarPalestrante = VisualiarPalestrante;
