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
exports.EventoPago = void 0;
const prisma_1 = require("../../../../prisma");
const EventoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento } = req.params;
    yield prisma_1.prisma.evento.findUnique({
        where: {
            id: idEvento
        }
    }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.evento.update({
            where: {
                id: idEvento
            },
            data: {
                pagamento: true
            }
        }).then((sucessoPago) => {
            res.json(sucessoPago);
        }).catch(error => {
            res.json(error);
        });
    }));
});
exports.EventoPago = EventoPago;
