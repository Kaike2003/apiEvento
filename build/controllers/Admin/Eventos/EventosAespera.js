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
exports.EventosAespera = void 0;
const prisma_1 = require("../../../prisma");
const EventosAespera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventosAespera = yield prisma_1.prisma.evento.findMany({
        where: {
            aprovado: false,
            publicado: true,
            banido: false
        },
        select: {
            nome: true,
            id: true,
            dataInicio: true,
            dataTermino: true,
            utilizadorId: true,
        }
    }).then((sucesso) => {
        res.status(200).json(sucesso);
    }).catch((error) => {
        res.status(400).json({ "Erro eventos aprovados": error });
    });
});
exports.EventosAespera = EventosAespera;
