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
exports.CriarTipoBilhete = void 0;
const prisma_1 = require("../../../prisma");
const validation_1 = require("../../../validation");
const CriarTipoBilhete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome } = req.body;
    const result = validation_1.TipoBilheteOmit.parse({
        nome: nome
    });
    try {
        const existe = yield prisma_1.prisma.tipoBilhete.findFirst({
            where: {
                nome: nome
            }, select: {
                nome: true
            }
        });
        if ((existe === null || existe === void 0 ? void 0 : existe.nome) === result.nome.toLowerCase()) {
            res.status(400).json("Esse valor já existe");
        }
        else {
            const criarTipoBilhete = yield prisma_1.prisma.tipoBilhete.create({
                data: {
                    nome: result.nome.toLowerCase()
                }
            }).then((sucesso) => {
                res.status(201).json(sucesso);
            }).catch((error) => {
                res.status(400).json(error);
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.CriarTipoBilhete = CriarTipoBilhete;
