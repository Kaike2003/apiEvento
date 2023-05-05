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
exports.PaginaPrincipalEventos = void 0;
const prisma_1 = require("../../../prisma");
const PaginaPrincipalEventos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginaPrincipalEventos = yield prisma_1.prisma.evento.findMany({
        where: {
            publicado: true,
            aprovado: true,
            banido: false,
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
        take: 8
    }).then((sucesso) => {
        res.json(sucesso);
        // console.log(sucesso)
    }).catch((error) => {
        res.json(error);
        console.log(error);
    });
});
exports.PaginaPrincipalEventos = PaginaPrincipalEventos;