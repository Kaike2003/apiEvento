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
exports.Shows = void 0;
const prisma_1 = require("../../../../prisma");
const diaAtual = new Date().getDate();
const mesAtual = new Date().getMonth();
const anoAtual = new Date().getFullYear();
const Shows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoriaNome = String("shows");
    const listarTeatros = yield prisma_1.prisma.categoria.findFirst({
        where: {
            nome: categoriaNome,
            OR: [
                { nome: "show" },
                { nome: "shows" },
            ]
        }
    }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
        if (!sucesso) {
            res.json("O nome da categoria não pode ser nulo");
            console.log(sucesso);
        }
        else {
            const listarEventosTeatros = yield prisma_1.prisma.evento.findMany({
                where: {
                    categoriaId: sucesso.id,
                    aprovado: true,
                    publicado: true,
                    banido: false, OR: [
                        { estado: "DESPONIVEL" },
                        { estado: "ADECORRER" },
                        { estado: "CANCELADO" }
                    ]
                }, include: {
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
                }
            }).then((evento) => {
                if (evento.map(item => {
                    if (item.dataInicio.getDate() === diaAtual && item.dataInicio.getMonth() === mesAtual && item.dataInicio.getFullYear() === anoAtual) {
                        prisma_1.prisma.evento.update({
                            where: {
                                id: item.id
                            },
                            data: {
                                estado: "ADECORRER"
                            }
                        }).then((sucessoEventoDecorrendo) => {
                            console.log("Evento decorrendo", sucessoEventoDecorrendo);
                        });
                    }
                    else if (item.dataInicio.getDate() < diaAtual && item.dataInicio.getMonth() < mesAtual && item.dataInicio.getFullYear() < anoAtual) {
                        prisma_1.prisma.evento.update({
                            where: {
                                id: item.id
                            },
                            data: {
                                estado: "FINALIZADO"
                            }
                        }).then((sucessoEvento) => {
                            console.log("Evento terminado", sucessoEvento);
                        });
                    }
                    else {
                        prisma_1.prisma.evento.update({
                            where: {
                                id: item.id
                            },
                            data: {
                                estado: "DESPONIVEL"
                            }
                        }).then((sucessoEvento) => {
                            console.log("Evento desponivel", sucessoEvento);
                        });
                    }
                }))
                    res.json(evento);
            }).catch((error) => {
                console.log(error);
                res.json(error);
            });
        }
    })).catch((error) => {
        res.json(error);
        console.log(error);
    });
});
exports.Shows = Shows;
