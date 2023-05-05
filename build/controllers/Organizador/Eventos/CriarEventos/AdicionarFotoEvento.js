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
exports.AdicionarFotoEvento = void 0;
const prisma_1 = require("../../../../prisma");
const AdicionarFotoEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { idEvento, idUtilizador } = req.params;
    const foto = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    console.log("File", req.file);
    console.log("Body", req.body);
    console.log("Nome da foto do evento", foto);
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findUnique({
        where: {
            id: idEvento
        }
    });
    try {
        if (foto === undefined) {
            res.status(400).json("A foto está indefinida");
            console.log("A foto está indefinida", foto);
        }
        else {
            if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento) {
                const evento = yield prisma_1.prisma.utilizador.findFirst({
                    where: {
                        id: idUtilizador,
                        evento: {
                            some: {
                                id: idEvento
                            }
                        }
                    },
                    // include: {
                    //     evento: {
                    //         where: {
                    //             id: idEvento
                    //         }
                    //     }
                    // }
                }).then((sucesso) => {
                    if (null === sucesso) {
                        res.json("Não pode atualizar foto um evento. Que não tenha um relacionamento com um utilizador.");
                    }
                    else {
                        const adicionarFotoEvento = prisma_1.prisma.evento.update({
                            where: {
                                id: idEvento
                            }, data: {
                                foto: foto
                            }
                        }).then((sucesso) => {
                            res.json(sucesso);
                            console.log(foto);
                        }).catch((error) => {
                            res.json(error);
                            console.log(error);
                        });
                        // res.json({
                        //     "Nome da foto do evento": foto,
                        //     "Id existe": idEvento,
                        // })
                    }
                    // const adicionarFotoEvento = prisma.evento.update({
                    //     where: {
                    //         id: idEvento
                    //     }, data: {
                    //         foto: foto
                    //     }
                    // })
                    // res.json({
                    //     "Nome da foto do evento": foto,
                    //     "Id existe": idEvento,
                    // })
                }).catch((error) => {
                    res.json({
                        "Não podes a tualizar a foto de um outro evento": error
                    });
                    console.log("Não podes a tualizar a foto de um outro evento", error);
                });
            }
            else {
                res.status(400).json({ "Id não existe": idEvento });
                console.log("Id não existe", idEvento);
            }
        }
    }
    catch (error) {
        res.status(400).json({ "Verifique os campos que estás mando {params, file ou body}": error });
        console.log("Verifique os campos que estás mando {params, file ou body}", error);
    }
});
exports.AdicionarFotoEvento = AdicionarFotoEvento;
