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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
const validation_1 = require("../../../../validation");
const prisma_1 = require("../../../../prisma");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const node_schedule_1 = __importDefault(require("node-schedule"));
let views = 0;
const rule = new node_schedule_1.default.RecurrenceRule();
rule.date = new Date().getDate();
rule.hour = 23;
rule.minute = 59;
rule.second = 59;
rule.month = new Date().getMonth();
const data = new Date(2023, rule.month, rule.date, rule.hour, rule.minute, rule.second);
const job = node_schedule_1.default.scheduleJob(data, (fireDate) => __awaiter(void 0, void 0, void 0, function* () {
    const listaReservas = yield prisma_1.prisma.compra.findMany({
        where: {
            foto: null,
            pagamento: false
        }
    }).then((compra) => __awaiter(void 0, void 0, void 0, function* () {
        if (!compra) {
            console.log("Valor nulo", compra);
        }
        else {
            compra.map((itemCompra) => __awaiter(void 0, void 0, void 0, function* () {
                yield prisma_1.prisma.compra.findUnique({
                    where: {
                        id: itemCompra.id
                    }
                }).then((sucessoCompra) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!sucessoCompra) {
                        console.log("Valor nulo", sucessoCompra);
                    }
                    else {
                        yield prisma_1.prisma.item_Bilhete.findFirst({
                            where: {
                                compraId: sucessoCompra === null || sucessoCompra === void 0 ? void 0 : sucessoCompra.id
                            }
                        }).then((sucessoItemBilhete) => __awaiter(void 0, void 0, void 0, function* () {
                            yield prisma_1.prisma.bilhete.findFirst({
                                where: {
                                    id: sucessoItemBilhete === null || sucessoItemBilhete === void 0 ? void 0 : sucessoItemBilhete.bilheteId
                                }
                            }).then((sucessoBilheteSelecionado) => __awaiter(void 0, void 0, void 0, function* () {
                                if (!sucessoBilheteSelecionado) {
                                    console.log("Valor nulo", sucessoBilheteSelecionado);
                                }
                                else {
                                    yield prisma_1.prisma.bilhete.update({
                                        where: {
                                            id: sucessoBilheteSelecionado === null || sucessoBilheteSelecionado === void 0 ? void 0 : sucessoBilheteSelecionado.id
                                        },
                                        data: {
                                            quantidade: (sucessoBilheteSelecionado === null || sucessoBilheteSelecionado === void 0 ? void 0 : sucessoBilheteSelecionado.quantidade) + (sucessoCompra === null || sucessoCompra === void 0 ? void 0 : sucessoCompra.quantidade)
                                        }
                                    }).then((sucessoBilheteRetornado) => __awaiter(void 0, void 0, void 0, function* () {
                                        yield prisma_1.prisma.item_Bilhete.delete({
                                            where: {
                                                id: sucessoItemBilhete === null || sucessoItemBilhete === void 0 ? void 0 : sucessoItemBilhete.id
                                            }
                                        }).then(() => __awaiter(void 0, void 0, void 0, function* () {
                                            yield prisma_1.prisma.compra.delete({
                                                where: {
                                                    id: sucessoCompra.id
                                                }
                                            }).then((sucessoDeletarCompra) => __awaiter(void 0, void 0, void 0, function* () {
                                                console.log("Compras apagas", sucessoDeletarCompra);
                                            })).catch((error) => {
                                                console.log(error);
                                            });
                                        })).catch((error) => {
                                            console.log(error);
                                        });
                                    })).catch((error) => {
                                        console.log(error);
                                    });
                                }
                            })).catch((error) => {
                                console.log(error);
                            });
                        })).catch((error) => {
                            console.log(error);
                        });
                    }
                })).catch((error) => {
                    console.log(error);
                });
            }));
        }
    })).catch((error) => {
        console.log(error);
    });
}));
console.log(job.nextInvocation());
// const rule = new nodeSchedule.RecurrenceRule()
// rule.date = new Date().getDate() + 1
// rule.hour = 23
// rule.minute = 59
// rule.second = 59
// rule.month = new Date().getMonth()
// const data = new Date(2023, 3, 16, 2, 21)
// const job = nodeSchedule.scheduleJob(data, async (fireDate) => {
//     const listaReservas = await prisma.reserva.findMany({
//         where: {
//             foto: null,
//             pagamento: false
//         }
//     }).then(async (reserva) => {
//         reserva.map(async (itemReserva) => {
//             await prisma.item_Bilhete.findMany({
//                 where: {
//                     reservaId: itemReserva.id
//                 }
//             }).then(async (bilhete_item) => {
//                 bilhete_item.map(async (itemBilhete) => {
//                     await prisma.bilhete.findMany(
//                         {
//                             where: {
//                                 id: itemBilhete.bilheteId
//                             }
//                         }
//                     ).then(async (bilhete) => {
//                         bilhete.map(async (itemBilheteBilhete) => {
//                             if (itemBilheteBilhete.id === itemBilhete.bilheteId
//                                 &&
//                                 itemReserva.id === itemBilhete.reservaId
//                             ) {
//                                 await prisma.bilhete.update({
//                                     where: {
//                                         id: itemBilheteBilhete.id
//                                     },
//                                     data: {
//                                         quantidade: itemReserva.quantidade + itemBilheteBilhete.quantidade
//                                     }
//                                 }).then(async (sucesso) => {
//                                     await prisma.reserva.update({
//                                         where: {
//                                             id: itemReserva.id
//                                         },
//                                         data: {
//                                             quantidade: itemReserva.quantidade - itemReserva.quantidade
//                                         }
//                                     }).then((sucesso) => {
//                                         console.log(sucesso.quantidade)
//                                     })
//                                     console.log(sucesso.quantidade)
//                                 }).catch((error) => {
//                                     console.log(error)
//                                 })
//                             } else {
//                                 console.log("Olá")
//                             }
//                         })
//                     }).catch((error) => {
//                         console.log(error)
//                     })
//                 })
//             }).catch((error) => {
//                 console.log(error)
//             })
//         })
//     }).catch((error) => {
//         console.log(error)
//     })
// })
// console.log(job.nextInvocation())
const tamanhoString = 8;
const bytesAleatorios = crypto_1.default.randomBytes(tamanhoString);
const stringAleatoria = bytesAleatorios.toString('base64');
const Reserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    views++;
    fs_1.default.writeFile('views.txt', views.toString(), (err) => {
        if (err)
            throw err;
    });
    const { idUtilizador, idEvento } = req.params;
    const { quantidade, bilheteId } = req.body;
    console.log(quantidade, bilheteId);
    console.log(typeof (quantidade));
    console.log(typeof (bilheteId));
    const result = validation_1.ReservaOmit.parseAsync({
        quantidade: quantidade,
        bilheteId: bilheteId,
        metodoPagamento: "Dinheiro"
    });
    const verificarEvento = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento,
            estado: "DESPONIVEL"
        }
    }).then((sucessoEvento) => __awaiter(void 0, void 0, void 0, function* () {
        const verificarUtizalidor = yield prisma_1.prisma.utilizador.findFirst({
            where: {
                id: idUtilizador
            }
        }).then((sucessoUtilizador) => __awaiter(void 0, void 0, void 0, function* () {
            if (!sucessoUtilizador) {
                res.status(400).json("valor nulo");
            }
            else {
                if (sucessoUtilizador.utilizador === "PARTICIPANTE") {
                    const verificarBilhete = yield prisma_1.prisma.bilhete.findFirst({
                        where: {
                            id: (yield result).bilheteId
                        }
                    }).then((sucessoBilhete) => __awaiter(void 0, void 0, void 0, function* () {
                        if (!sucessoBilhete) {
                            res.status(400).json("bilhete não pode ser nulo");
                        }
                        else {
                            if (sucessoBilhete.quantidade === 0) {
                                res.status(400).json("Bilhete para este evento estão esgotados.");
                            }
                            else {
                                if (quantidade <= sucessoBilhete.quantidade) {
                                    if (quantidade >= 1) {
                                        const itemBilehte = yield prisma_1.prisma.item_Bilhete.create({
                                            data: {
                                                bilhete: {
                                                    connect: {
                                                        id: (yield result).bilheteId
                                                    }
                                                },
                                                compra: {
                                                    create: {
                                                        total: (sucessoBilhete === null || sucessoBilhete === void 0 ? void 0 : sucessoBilhete.preco) * (yield result).quantidade,
                                                        metodoPagamento: "Dinheiro",
                                                        quantidade: (yield result).quantidade,
                                                        pagamento: false,
                                                        utilizadorId: idUtilizador
                                                    }
                                                }
                                            }
                                        }).then((sucessoBilheteQuantidade) => __awaiter(void 0, void 0, void 0, function* () {
                                            const reduzirBilhetes = yield prisma_1.prisma.bilhete.update({
                                                where: {
                                                    id: (yield result).bilheteId
                                                },
                                                data: {
                                                    quantidade: sucessoBilhete.quantidade - (yield result).quantidade
                                                }
                                            }).then((reservaFeita) => __awaiter(void 0, void 0, void 0, function* () {
                                                fs_1.default.readFile('views.txt', (err, data) => {
                                                    if (err)
                                                        throw err;
                                                    views = parseInt(data.toString());
                                                    console.log(`Número anterior de visualizações: ${views}`);
                                                });
                                                res.status(201).json({
                                                    "Codigo da sua reserva": stringAleatoria,
                                                    "Quantidade de bilhetes reservados": quantidade
                                                });
                                            })).catch((error) => {
                                                res.status(400).json(error);
                                            });
                                        })).catch((error) => {
                                            res.status(400).json(error);
                                        });
                                    }
                                    else {
                                        res.status(400).json("A quantidade bilhete não pode ser negativa.");
                                    }
                                }
                                else {
                                    res.status(400).json(`A quantidade de bilhete desponivel para esse evento é ${sucessoBilhete.quantidade}. Então reserve bilhetes menores que ${sucessoBilhete.quantidade}. `);
                                }
                            }
                        }
                    })).catch((error) => {
                        res.status(400).json(error);
                    });
                }
                else {
                    res.status(400).json("Só os participantes podem comprar bilhetes.");
                }
            }
            // const reservar = await prisma.reserva.create({
            //     data: {
            //         quantidade: quantidade,
            //         total: 40,
            //         metodoPagamento: "Dinheiro",
            //     }
            // })
        })).catch((error) => {
            res.status(400).json(error);
        });
    })).catch((error) => {
        res.status(400).json(error);
    });
});
exports.Reserva = Reserva;
