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
exports.CriarOrador = void 0;
const prisma_1 = require("../../../../../prisma");
const CriarOrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento } = req.params;
    const { nome } = req.body;
    const verificarIdEvento = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    });
    if ((verificarIdEvento === null || verificarIdEvento === void 0 ? void 0 : verificarIdEvento.id) === idEvento) {
        const criarPalestrante = yield prisma_1.prisma.orador.create({
            data: {
                nome: nome,
                evento: {
                    create: {
                        evento: {
                            connect: {
                                id: idEvento
                            }
                        }
                    }
                }
            }
        }).then((sucesso) => {
            res.status(201).json({ "Orador criado com sucesso": sucesso });
        }).catch((error) => {
            res.status(400).json({ "Criar orador erro": error });
        });
    }
    else {
        res.json({ "Id não existe ou evento não existe": idEvento });
    }
});
exports.CriarOrador = CriarOrador;
