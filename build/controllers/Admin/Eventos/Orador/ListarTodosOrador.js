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
exports.ListarTodosOrador = void 0;
const prisma_1 = require("../../../../prisma");
const ListarTodosOrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listarTodosOrador = yield prisma_1.prisma.orador.findMany().then((sucessoOrador) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(sucessoOrador);
        console.log(sucessoOrador);
    })).catch((error) => {
        res.status(400).json(error);
        console.log(error);
    });
});
exports.ListarTodosOrador = ListarTodosOrador;
