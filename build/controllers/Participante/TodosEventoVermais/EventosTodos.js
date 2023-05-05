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
exports.EventosTodosVermais = void 0;
const prisma_1 = require("../../../prisma");
const EventosTodosVermais = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const diaAtual = new Date().getDate();
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();
    const listarTodosEventos = yield prisma_1.prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: true,
            OR: [
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
        }
    }).then((evento) => {
        if (evento.map(item => {
            if (item.dataInicio.getDate() === diaAtual
                &&
                    item.dataInicio.getMonth() === mesAtual
                &&
                    item.dataInicio.getFullYear() === anoAtual) {
                console.log("Evento decorrendo");
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
            else if (item.dataInicio.getDate() <= diaAtual && item.dataInicio.getMonth() <= mesAtual && item.dataInicio.getFullYear() <= anoAtual) {
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
        // res.json(evento)
    }).catch((error) => {
        console.log(error);
        res.json(error);
    });
});
exports.EventosTodosVermais = EventosTodosVermais;
