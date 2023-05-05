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
exports.CriarBilhete = void 0;
const prisma_1 = require("../../../../../prisma");
const validation_1 = require("../../../../../validation");
const CriarBilhete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEvento } = req.params;
    const { nome, preco, horaInicio, horaTermino, dataInicio, dataTermino, quantidade, tipoEvento } = req.body;
    const result = validation_1.BilheteOmit.parseAsync({
        nome: nome,
        preco: preco,
        quantidade: quantidade,
        tipoEvento: tipoEvento,
        dataInicio: new Date(dataInicio),
        dataTermino: new Date(dataTermino),
        horaInicio: new Date(`${dataInicio} ${horaInicio}`),
        horaTermino: new Date(`${dataTermino} ${horaTermino}`),
    });
    const valores_Req_Body = [
        nome,
        preco,
        horaInicio,
        horaTermino,
        dataInicio,
        dataTermino,
        quantidade,
        tipoEvento
    ];
    const verificarIdEvento = yield prisma_1.prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    });
    if ((verificarIdEvento === null || verificarIdEvento === void 0 ? void 0 : verificarIdEvento.id) === idEvento
        &&
            verificarIdEvento.banido === false) {
        if (verificarIdEvento.dataInicio.getDate() > (yield result).dataInicio.getDate()
            &&
                verificarIdEvento.dataInicio.getDate() >= (yield result).dataTermino.getDate()
            &&
                verificarIdEvento.dataInicio.getDate() !== (yield result).dataInicio.getDate()
            && (yield result).dataTermino > (yield result).dataInicio
            && (yield result).dataInicio.getMonth() <= verificarIdEvento.dataInicio.getMonth()
            && (yield result).dataTermino.getMonth() <= verificarIdEvento.dataTermino.getMonth()) {
            const criarBilhete = yield prisma_1.prisma.bilhete.create({
                data: {
                    nome: (yield result).nome,
                    preco: (yield result).preco,
                    horaInicio: (yield result).horaInicio,
                    horaTermino: (yield result).horaTermino,
                    dataInicio: (yield result).dataInicio,
                    dataTermino: (yield result).dataTermino,
                    quantidade: (yield result).quantidade,
                    tipoEvento: {
                        connect: {
                            id: (yield result).tipoEvento
                        }
                    },
                    evento: {
                        connect: {
                            id: (idEvento)
                        }
                    }
                }
            }).then((sucesso) => {
                res.status(201).json(sucesso);
                console.log("Bilhete criado com sucesso", sucesso);
            }).catch((error) => {
                res.status(400).json(error);
                console.log("Bilhete erro", error);
                console.log("Resultado", { result, valores_Req_Body });
            });
        }
        else {
            res.status(400).json(`
            <p> 
            A venda dos bilhetes deve acontecer dias antes do evento acontecer. 
            <p> 
            Data de inicio do evento:
            <strong> 
            ${verificarIdEvento.dataInicio.getDate()}/${verificarIdEvento.dataInicio.getMonth()}/${verificarIdEvento.dataInicio.getFullYear()}
            </strong>
            <br />
            Data de termino do evento:
            <strong>
            ${verificarIdEvento.dataTermino.getDate()}/${verificarIdEvento.dataTermino.getMonth()}/${verificarIdEvento.dataTermino.getFullYear()} 
            </strong> 
           `);
            // res.status(400).json({
            //     "Possiveis erros": {
            //         "Valores vindo do body": valores_Req_Body,
            //         "Data inicio evento": `${verificarIdEvento.dataInicio.getDate()}/${verificarIdEvento.dataInicio.getMonth()}/${verificarIdEvento.dataInicio.getFullYear()}`,
            //         "Data termino evento": `${verificarIdEvento.dataTermino.getDate()}/${verificarIdEvento.dataTermino.getMonth()}/${verificarIdEvento.dataTermino.getFullYear()}`,
            //         "Data inicio bilhete": (await result).dataInicio.getDate(),
            //         "Data termino bilhete": (await result).dataTermino.getDate(),
            //         "Teste de validação": verificarIdEvento.dataInicio.getDate() > (await result).dataInicio.getDate()
            //             &&
            //             verificarIdEvento.dataInicio.getDate() >= (await result).dataTermino.getDate()
            //             &&
            //             verificarIdEvento.dataInicio.getDate() !== (await result).dataInicio.getDate()
            //             && (await result).dataTermino > (await result).dataInicio
            //     }
            // })
            console.log("Possiveis erros", {
                "Valores vindo do body": valores_Req_Body,
                "Data inicio evento": `${verificarIdEvento.dataInicio.getDate()}/${verificarIdEvento.dataInicio.getMonth()}/${verificarIdEvento.dataInicio.getFullYear()}`,
                "Data termino evento": `${verificarIdEvento.dataTermino.getDate()}/${verificarIdEvento.dataTermino.getMonth()}/${verificarIdEvento.dataTermino.getFullYear()}`,
                "Data inicio bilhete": (yield result).dataInicio.getDate(),
                "Data termino bilhete": (yield result).dataTermino.getDate(),
                "Teste de validação": verificarIdEvento.dataInicio.getDate() > (yield result).dataInicio.getDate()
                    &&
                        verificarIdEvento.dataInicio.getDate() >= (yield result).dataTermino.getDate()
                    &&
                        verificarIdEvento.dataInicio.getDate() !== (yield result).dataInicio.getDate()
                    && (yield result).dataTermino > (yield result).dataInicio
            });
        }
    }
    else {
        if (!verificarIdEvento) {
            res.status(400).json({ "Evento nulo kk": verificarIdEvento });
        }
        else {
            res.status(400).json({
                "Id não existe ou evento não existe": idEvento,
            });
        }
    }
});
exports.CriarBilhete = CriarBilhete;
