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
exports.ShowsLimite = void 0;
const prisma_1 = require("../../../../prisma");
const ShowsLimite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite } = req.query;
    const limitar = Number(limite);
    console.log("Limitador", limitar);
    const categoriaNome = String("shows");
    const listarTeatros = yield prisma_1.prisma.categoria.findFirst({
        where: {
            nome: categoriaNome
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
                },
                include: {
                    bilhete: {
                        include: {
                            evento: {
                                include: {
                                    bilhete: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    at_create: "desc"
                },
                take: limitar
            }).then((evento) => {
                res.json(evento);
                console.log(evento);
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
exports.ShowsLimite = ShowsLimite;
