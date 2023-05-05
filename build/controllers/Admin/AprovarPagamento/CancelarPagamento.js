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
exports.CancelarPagamento = void 0;
const prisma_1 = require("../../../prisma");
const CancelarPagamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCompra, idUtilizador } = req.params;
    try {
        const verificarUtilizador = yield prisma_1.prisma.utilizador.findUnique({
            where: {
                id: idUtilizador
            }
        }).then((sucessoUtililizador) => __awaiter(void 0, void 0, void 0, function* () {
            if (!sucessoUtililizador) {
                res.status(400).json("Utilizador null");
            }
            else {
                const verificarCompra = yield prisma_1.prisma.compra.findUnique({
                    where: {
                        id: idCompra
                    }
                }).then((sucessoCompra) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!sucessoCompra) {
                        res.status(400).json("Compra null");
                    }
                    else {
                        const item_Bilhete_Reserva = yield prisma_1.prisma.item_Bilhete.findFirst({
                            where: {
                                compraId: idCompra
                            }
                        }).then((item_Bilhete_Reserva) => __awaiter(void 0, void 0, void 0, function* () {
                            if (!item_Bilhete_Reserva) {
                                res.status(400).json(item_Bilhete_Reserva);
                            }
                            else {
                                const bilhteVerificar = yield prisma_1.prisma.bilhete.findUnique({
                                    where: {
                                        id: item_Bilhete_Reserva.bilheteId
                                    }
                                }).then((sucessoBilhteVerificar) => __awaiter(void 0, void 0, void 0, function* () {
                                    if (!sucessoBilhteVerificar) {
                                        res.status(400).json(sucessoBilhteVerificar);
                                    }
                                    else {
                                        const voltarAquantidadeBilhete = yield prisma_1.prisma.bilhete.update({
                                            where: {
                                                id: sucessoBilhteVerificar.id
                                            },
                                            data: {
                                                quantidade: sucessoCompra.quantidade + sucessoBilhteVerificar.quantidade
                                            }
                                        }).then((sucessovoltarAquantidadeBilhete) => __awaiter(void 0, void 0, void 0, function* () {
                                            if (!sucessovoltarAquantidadeBilhete) {
                                                res.status(400).json("Quantidade bilhete null");
                                            }
                                            else {
                                                const apagar_Item_Bilhete = yield prisma_1.prisma.item_Bilhete.delete({
                                                    where: {
                                                        id: item_Bilhete_Reserva.id
                                                    }
                                                }).then((apagar_Item_Bilhete) => __awaiter(void 0, void 0, void 0, function* () {
                                                    if (!apagar_Item_Bilhete) {
                                                        console.log(apagar_Item_Bilhete);
                                                        res.status(400).json("item bilhete null");
                                                    }
                                                    else {
                                                        const apagarReserva = yield prisma_1.prisma.compra.delete({
                                                            where: {
                                                                id: idCompra
                                                            }
                                                        }).then((sucessoApagarReserva) => __awaiter(void 0, void 0, void 0, function* () {
                                                            if (!sucessoApagarReserva) {
                                                                res.status(400).json("Apagar reserva null");
                                                            }
                                                            else {
                                                                res.json(sucessoApagarReserva);
                                                                console.log(sucessoApagarReserva);
                                                            }
                                                        }));
                                                    }
                                                })).catch((error) => {
                                                    res.status(400).json(error);
                                                    console.log(error);
                                                });
                                            }
                                        })).catch(error => {
                                            res.status(400).json(error);
                                            console.log(error);
                                        });
                                    }
                                })).catch(error => {
                                    res.status(400).json(error);
                                    console.log(error);
                                });
                            }
                        })).catch(error => {
                            res.status(400).json(error);
                            console.log(error);
                        });
                    }
                })).catch(error => {
                    res.status(400).json(error);
                    console.log(error);
                });
            }
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
exports.CancelarPagamento = CancelarPagamento;
