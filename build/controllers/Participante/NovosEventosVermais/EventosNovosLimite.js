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
exports.EventosNovosLimiteVermais = void 0;
const prisma_1 = require("../../../prisma");
const EventosNovosLimiteVermais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite } = req.query;
    const limitedeEvento = Number(limite);
    console.log(limite);
    const listarEventosNovos = yield prisma_1.prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: true,
            OR: [
                { estado: "DESPONIVEL" },
                { estado: "ADECORRER" },
                { estado: "CANCELADO" }
            ]
        },
        include: {
            bilhete: {
                include: {
                    evento: {
                        include: {
                            bilhete: true
                        }
                    }
                },
                take: 1
            }
        },
        orderBy: {
            at_create: "desc"
        },
        take: limitedeEvento
    }).then((sucesso) => {
        res.json(sucesso);
        console.log("Todos eventos novos", sucesso);
    }).catch((error) => {
        res.json({ "Erro listar todos participantes": error });
    });
});
exports.EventosNovosLimiteVermais = EventosNovosLimiteVermais;
