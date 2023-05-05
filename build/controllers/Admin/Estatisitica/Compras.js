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
exports.EstatisticaCompra = void 0;
const prisma_1 = require("../../../prisma");
const EstatisticaCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventosPublicados = yield prisma_1.prisma.compra.count({
            where: {
                pagamento: true
            }
        }).then((sucessoCompra) => __awaiter(void 0, void 0, void 0, function* () {
            res.json(sucessoCompra);
        })).catch(error => {
            res.status(400).json(error);
            console.log(error);
        });
    }
    catch (error) {
        res.status(400).json(error);
        console.log(error);
    }
});
exports.EstatisticaCompra = EstatisticaCompra;
