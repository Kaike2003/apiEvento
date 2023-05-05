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
exports.AdicioanarComprovativo = void 0;
const prisma_1 = require("../../../prisma");
const AdicioanarComprovativo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCompra, idUtilizador } = req.params;
    const foto = req.file;
    console.log(foto);
    const verificarUtilizador = yield prisma_1.prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    }).then((sucesso) => __awaiter(void 0, void 0, void 0, function* () {
        if (!sucesso) {
            res.json("Nulo, verifique os parametros");
        }
        else {
            const verificarReserva = yield prisma_1.prisma.compra.findUnique({
                where: {
                    id: idCompra
                }
            }).then((sucessoCompra) => __awaiter(void 0, void 0, void 0, function* () {
                if (!sucessoCompra) {
                    res.status(400).json("Nulo, verifique os parametros");
                }
                else {
                    if (sucesso.id === sucessoCompra.utilizadorId) {
                        if (!foto) {
                            res.json("A foto não pode ser undefined");
                        }
                        else {
                            if (foto.size <= 39769) {
                                const adicionarComprovaito = yield prisma_1.prisma.compra.update({
                                    where: {
                                        id: idCompra
                                    },
                                    data: {
                                        foto: foto.filename
                                    }
                                }).then((sucessoFoto) => __awaiter(void 0, void 0, void 0, function* () {
                                    res.json(sucessoFoto);
                                })).catch((error) => {
                                    res.status(400).json(error);
                                    console.log(error);
                                });
                            }
                            else {
                                res.status(400).json("Verifique seu comprovativo, talvéz não seja válido.");
                            }
                        }
                    }
                    else {
                        res.status(400).json("Id do utilizador ou da reserva inválido");
                    }
                }
            }));
        }
    })).catch((error) => {
        res.json(error);
    });
});
exports.AdicioanarComprovativo = AdicioanarComprovativo;
