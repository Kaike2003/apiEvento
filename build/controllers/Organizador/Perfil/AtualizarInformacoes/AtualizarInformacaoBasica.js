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
exports.AtualizarInformacaoBasica = void 0;
const prisma_1 = require("../../../../prisma");
const validation_1 = require("../../../../validation");
const AtualizarInformacaoBasica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUtilizador } = req.params;
    const { nome, dataNascimento, localizacao, telefone, iban } = req.body;
    console.log(typeof (telefone));
    const result = validation_1.UtilizadorSchemaInformaçãoPerfil.parseAsync({
        nome: nome,
        dataNascimento: new Date(dataNascimento),
        localizacao: localizacao,
        telefone: telefone,
        iban: iban
    });
    const verificarUtilizadorExiste = yield prisma_1.prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    });
    try {
        if (!verificarUtilizadorExiste) {
            res.json("Valor nulo. Verifique o seu id");
        }
        else {
            if (verificarUtilizadorExiste.id === idUtilizador
                &&
                    verificarUtilizadorExiste.utilizador === "ORGANIZADOR") {
                const atualizarInformacaoBasicaParticipante = yield prisma_1.prisma.utilizador.update({
                    where: {
                        id: idUtilizador
                    },
                    data: {
                        nome: (yield result).nome,
                        dataNascimento: (yield result).dataNascimento,
                        telefone: String((yield result).telefone),
                        localizacao: (yield result).localizacao,
                        iban: (yield result).iban,
                    }
                }).then((sucesso) => {
                    res.json({ "Atualizações das informações feita com sucesso.": sucesso });
                }).catch((error) => {
                    res.json(error);
                });
            }
            else {
                res.json("Para fazer atualização desse perfil. Precisa ter uma conta de organizador.");
            }
        }
    }
    catch (error) {
        res.json(error);
    }
});
exports.AtualizarInformacaoBasica = AtualizarInformacaoBasica;
