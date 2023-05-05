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
exports.VerificarContaParticipante = void 0;
const prisma_1 = require("../../../prisma");
const VerificarContaParticipante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { idUtilizador }: QueryParams = req.params
    const { codigoVerificacao } = req.body;
    const aprovarUtilizador = yield prisma_1.prisma.utilizador.findFirst({
        where: {
            codigo: codigoVerificacao
        }
    });
    try {
        console.log({ "VerificarConta": codigoVerificacao });
        if (!aprovarUtilizador) {
            res.json("Valor nulo");
        }
        else {
            console.log({ Banido: aprovarUtilizador.banido === true });
            if (aprovarUtilizador.banido === true && aprovarUtilizador.verificado === false && aprovarUtilizador.utilizador !== "PARTICIPANTE") {
                res.json("Esse email foi banido da aplicação. Já não pode ser confirmado");
            }
            else {
                const selecionarUtilizador = prisma_1.prisma.utilizador.findFirst({
                    where: {
                        codigo: codigoVerificacao
                    }
                }).then((sucessoSelecionarUtilizador) => {
                    const aprovadoUtilizador = prisma_1.prisma.utilizador.update({
                        where: {
                            id: sucessoSelecionarUtilizador === null || sucessoSelecionarUtilizador === void 0 ? void 0 : sucessoSelecionarUtilizador.id
                        },
                        data: {
                            verificado: true
                        }
                    }).then((sucesso) => {
                        res.json(`Usuario: ${sucesso.nome}, confirmado com sucesso`);
                    }).catch((error) => {
                        res.json(error);
                    });
                }).catch((error) => {
                    res.json(error);
                });
            }
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.VerificarContaParticipante = VerificarContaParticipante;
