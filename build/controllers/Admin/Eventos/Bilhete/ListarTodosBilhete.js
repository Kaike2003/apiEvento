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
exports.ListarTodosBilhete = void 0;
const prisma_1 = require("../../../../prisma");
const ListarTodosBilhete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listarTodosBilhete = yield prisma_1.prisma.bilhete.findMany().then((sucesso) => {
        res.json(sucesso);
        // console.log(sucesso)
    }).catch((error) => {
        res.json(error);
        console.log(error);
    });
});
exports.ListarTodosBilhete = ListarTodosBilhete;
