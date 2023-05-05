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
exports.PublicarEvento = void 0;
const prisma_1 = require("../../../../prisma");
const PublicarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento, idUtilizador } = req.params;
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    });
    const verificarIdUtilizadorExiste = yield prisma_1.prisma.utilizador.findFirst({
        where: {
            id: idUtilizador,
            evento: {
                some: {
                    id: idEvento
                }
            }
        }
    });
    try {
        if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento
            &&
                (verificarIdUtilizadorExiste === null || verificarIdUtilizadorExiste === void 0 ? void 0 : verificarIdUtilizadorExiste.id) === idUtilizador
            &&
                verificarIdUtilizadorExiste.utilizador === "ORGANIZADOR") {
            const verificarBilhete = yield prisma_1.prisma.bilhete.findFirst({
                where: {
                    eventoId: idEvento
                }
            }).then((sucessoBilhete) => __awaiter(void 0, void 0, void 0, function* () {
                if (sucessoBilhete === null) {
                    res.status(400).json("Crie um bilhe para esse assim, só assim poderás publicar");
                }
                else {
                    if (verificarIdEventoExiste.publicado === false) {
                        const adicionarFotoEvento = yield prisma_1.prisma.evento.update({
                            where: {
                                id: idEvento
                            }, data: {
                                publicado: true
                            }
                        }).then(() => {
                            res.status(201).json(`Evento ${idEvento} publicado com sucesso do evento`);
                        }).catch((error) => {
                            res.status(400).json("Aviso Esse evento já foi publicado");
                        });
                        // res.json(`Evento ${idEvento} publicado com sucesso do evento`)
                    }
                    else {
                        res.status(400).json(idEvento);
                        console.log("Aviso Esse evento já foi publicado", idEvento);
                    }
                }
            }));
        }
        else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o id do utilizador": idUtilizador
            });
        }
    }
    catch (error) {
        res.json({ "Verifique os campos que estás mando {params, file ou body}": error });
    }
    // const verificarIdEventoExiste: Evento | null = await prisma.evento.findFirst({
    //     where: {
    //         id: idEvento
    //     }
    // })
    // const verificarIdUtilizadorExiste: Utilizador | null = await prisma.utilizador.findFirst({
    //     where: {
    //         id: idUtilizador,
    //         evento: {
    //             some: {
    //                 id: idEvento
    //             }
    //         }
    //     },
    //      include: {
    //         evento: {
    //             where: {
    //                 id: idEvento
    //             }
    //         }
    //     }
    // })
    // try {
    //     if (
    //         verificarIdEventoExiste?.id === idEvento
    //         &&
    //         verificarIdUtilizadorExiste?.id === idUtilizador
    //         &&
    //         verificarIdUtilizadorExiste.utilizador === "ORGANIZADOR"
    //     ) {
    //         if (verificarIdEventoExiste.publicado === false) {
    //             const adicionarFotoEvento = await prisma.evento.update({
    //                 where: {
    //                     id: idEvento
    //                 }, data: {
    //                     publicado: true
    //                 }
    //             })
    //             res.json(`Evento ${idEvento} publicado com sucesso do evento`)
    //         } else {
    //             res.json({ "[Aviso!] Esse evento já foi publico": idEvento })
    //         }
    //     } else {
    //         res.json({ "Id não existe": idEvento })
    //     }
    // } catch (error) {
    //     res.json({ "Verifique os campos que estás mando {params, file ou body}": error })
    // }
});
exports.PublicarEvento = PublicarEvento;
