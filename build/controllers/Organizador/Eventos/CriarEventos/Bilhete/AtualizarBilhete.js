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
exports.AtualizarBilhete = void 0;
const prisma_1 = require("../../../../../prisma");
prisma_1.prisma;
const validation_1 = require("../../../../../validation");
const AtualizarBilhete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento, idBilhete } = req.params;
    console.log(idEvento, idBilhete);
    const { nome, preco, horaInicio, horaTermino, dataInicio, dataTermino, quantidade, tipoEvento } = req.body;
    const valores_Req_Body = [nome,
        preco,
        horaInicio,
        horaTermino,
        dataInicio,
        dataTermino,
        quantidade,
        tipoEvento];
    console.log(valores_Req_Body);
    const result = validation_1.BilheteOmit.parse({
        nome: nome,
        preco: preco,
        quantidade: quantidade,
        tipoEvento: tipoEvento,
        dataInicio: new Date(dataInicio),
        dataTermino: new Date(dataTermino),
        horaInicio: new Date(`${dataInicio} ${horaInicio}`),
        horaTermino: new Date(`${dataTermino} ${horaTermino}`),
    });
    const verificarIdEventoExiste = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    });
    const verificarIdBilheteExiste = yield prisma_1.prisma.bilhete.findFirst({
        where: {
            id: idBilhete
        }
    });
    try {
        if ((verificarIdEventoExiste === null || verificarIdEventoExiste === void 0 ? void 0 : verificarIdEventoExiste.id) === idEvento && (verificarIdBilheteExiste === null || verificarIdBilheteExiste === void 0 ? void 0 : verificarIdBilheteExiste.id) === idBilhete) {
            const evento = yield prisma_1.prisma.bilhete.findFirst({
                where: {
                    id: idBilhete,
                    evento: {
                        id: idEvento
                    }
                },
                include: {
                    // bilhete: {
                    //     where: {
                    //         id: idBilheteAtualizar
                    //     }
                    // }
                    evento: {
                        select: {
                            bilhete: {
                                where: {
                                    id: idBilhete
                                }
                            }
                        }
                    }
                }
            }).then((sucesso) => {
                // res.json({ sucesso, idEvento, idBilheteAtualizar })
                if (null === sucesso) {
                    res.json("Não pode atualizar um bilhete. Que não tenha um relacionamento com um evento.");
                }
                else {
                    if (verificarIdEventoExiste.dataInicio.getDate() > (result).dataInicio.getDate()
                        &&
                            verificarIdEventoExiste.dataInicio.getDate() >= (result).dataTermino.getDate()
                        &&
                            verificarIdEventoExiste.dataInicio.getDate() !== (result).dataInicio.getDate()
                        && (result).dataTermino > (result).dataInicio
                        && (result).dataInicio.getMonth() <= verificarIdEventoExiste.dataInicio.getMonth()
                        && (result).dataTermino.getMonth() <= verificarIdEventoExiste.dataTermino.getMonth()) {
                        const atualizarBilhete = prisma_1.prisma.bilhete.update({
                            where: {
                                id: idBilhete
                            },
                            data: {
                                nome: (result).nome,
                                preco: (result).preco,
                                horaInicio: (result).horaInicio,
                                horaTermino: (result).horaTermino,
                                dataInicio: (result).dataInicio,
                                dataTermino: (result).dataTermino,
                                quantidade: (result).quantidade,
                                tipoEvento: {
                                    connect: {
                                        id: (result).tipoEvento
                                    }
                                },
                                evento: {
                                    connect: {
                                        id: (idEvento)
                                    }
                                }
                            }
                        }).then((sucesso) => {
                            res.json({ "Bilhete atualizado com sucesso": sucesso });
                        }).catch((error) => {
                            res.json(error);
                        });
                    }
                    else {
                        // res.json({
                        //     "Possiveis erros": {
                        //         "Valores vindo do body": valores_Req_Body,
                        //         "Data inicio evento": `${verificarIdEventoExiste.dataInicio.getDate()}/${verificarIdEventoExiste.dataInicio.getMonth()}/${verificarIdEventoExiste.dataInicio.getFullYear()}`,
                        //         "Data termino evento": `${verificarIdEventoExiste.dataTermino.getDate()}/${verificarIdEventoExiste.dataTermino.getMonth()}/${verificarIdEventoExiste.dataTermino.getFullYear()}`,
                        //         "Data inicio bilhete": (result).dataInicio.getDate(),
                        //         "Data termino bilhete": (result).dataTermino.getDate(),
                        //         "Teste de validação": verificarIdEventoExiste.dataInicio.getDate() > (result).dataInicio.getDate()
                        //             &&
                        //             verificarIdEventoExiste.dataInicio.getDate() >= (result).dataTermino.getDate()
                        //             &&
                        //             verificarIdEventoExiste.dataInicio.getDate() !== (result).dataInicio.getDate()
                        //             && (result).dataTermino > (result).dataInicio
                        //     }
                        // })
                        res.status(400).json(`
                        <p> 
                        A venda dos bilhetes deve acontecer dias antes do evento acontecer. 
                        <p> 
                        Data de inicio do evento:
                        <strong> 
                        ${verificarIdEventoExiste.dataInicio.getDate()}/${verificarIdEventoExiste.dataInicio.getMonth()}/${verificarIdEventoExiste.dataInicio.getFullYear()}
                        </strong>
                        <br />
                        Data de termino do evento:
                        <strong>
                        ${verificarIdEventoExiste.dataTermino.getDate()}/${verificarIdEventoExiste.dataTermino.getMonth()}/${verificarIdEventoExiste.dataTermino.getFullYear()}
                        </strong> 
                       `);
                    }
                }
            }).catch((error) => {
                res.json(error);
            });
        }
        else {
            res.status(400).json({
                "Verifique o id do evento": idEvento,
                "Verifique o Id do bilhete": idBilhete
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.AtualizarBilhete = AtualizarBilhete;
