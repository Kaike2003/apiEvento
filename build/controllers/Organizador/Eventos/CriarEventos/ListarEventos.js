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
exports.ListarEventos = void 0;
const prisma_1 = require("../../../../prisma");
const ListarEventos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUtilizador } = req.params;
    const verificarIdUtilizadorExiste = yield prisma_1.prisma.utilizador.findFirst({
        where: {
            id: idUtilizador
        }
    });
    console.log("Id do utilizador", idUtilizador);
    try {
        if ((verificarIdUtilizadorExiste === null || verificarIdUtilizadorExiste === void 0 ? void 0 : verificarIdUtilizadorExiste.id) === idUtilizador &&
            verificarIdUtilizadorExiste.utilizador === "ORGANIZADOR") {
            // const listarEvento = await prisma.utilizador.findMany({
            //     select: {
            //         evento: {
            //             where: {
            //                 utilizadorId: idUtilizador,
            //             },
            //             select: {
            //                 nome: true,
            //                 dataInicio: true,
            //                 dataTermino: true
            //             }
            //         }
            //     }
            // })
            const listarEvento = yield prisma_1.prisma.evento.findMany({
                where: {
                    utilizador: { id: idUtilizador }
                },
                orderBy: {
                    at_create: "desc"
                }
            }).then((sucesso) => {
                res.status(200).json(sucesso);
                console.log(sucesso);
            }).catch((error) => {
                res.status(400).json(error);
            });
        }
        else {
            res.status(400).json({
                "Verifique o id do utilizador": idUtilizador
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.ListarEventos = ListarEventos;
