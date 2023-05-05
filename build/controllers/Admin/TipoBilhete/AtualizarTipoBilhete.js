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
exports.AtualizarTipoBilhete = void 0;
const prisma_1 = require("../../../prisma");
const validation_1 = require("../../../validation");
const AtualizarTipoBilhete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nome } = req.body;
    const idNumber = String(id);
    try {
        const result = validation_1.TipoBilheteOmit.parse({
            nome: nome
        });
        const atualizarTipoBilhete = yield prisma_1.prisma.tipoBilhete.update({
            where: {
                id: idNumber
            }, data: {
                nome: result.nome
            }
        }).then((sucesso) => {
            res.status(200).json(sucesso);
        }).catch((error) => {
            res.status(400).json(error);
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.AtualizarTipoBilhete = AtualizarTipoBilhete;
