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
exports.CategoriaEvento = void 0;
const prisma_1 = require("../../../prisma");
const CategoriaEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCategoria } = req.params;
    const categoriaEvento = yield prisma_1.prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: true,
            categoriaId: idCategoria
        },
        include: {
            categoria: {
                select: {
                    nome: true,
                    id: true
                }
            }
        }
    }).then((sucesso) => {
        res.json({ "Todos eventos por categoria": sucesso });
    }).catch((error) => {
        res.json({ "Erro listar todos participantes": error });
    });
});
exports.CategoriaEvento = CategoriaEvento;
