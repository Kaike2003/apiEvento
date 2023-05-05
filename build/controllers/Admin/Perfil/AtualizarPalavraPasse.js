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
exports.AtualizarPalavraPasse = void 0;
const password_1 = require("../../../password/password");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../../prisma");
const validation_1 = require("../../../validation");
const AtualizarPalavraPasse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUtilizador } = req.params;
    const { palavraPasse, palavraPasseAntiga } = req.body;
    const result = validation_1.UtilizadorOmitAtualizarPalavaraPasse.parseAsync({
        palavraPasse: yield (0, password_1.Password)(palavraPasse),
        palavraPasseAntiga: palavraPasseAntiga
    });
    const verificarUtilizadorExiste = yield prisma_1.prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    });
    if (!verificarUtilizadorExiste) {
        res.json("Valor nulo. Verifique o seu id");
    }
    else {
        try {
            if (!verificarUtilizadorExiste) {
                res.json("Valor nulo. Verifique o seu id");
            }
            else {
                const senhaCorreta = yield bcrypt_1.default.compare(palavraPasseAntiga, verificarUtilizadorExiste.palavraPasse);
                if (!senhaCorreta) {
                    res.status(400).json("Senha incorreta. Verifique sua senha");
                }
                else {
                    if (verificarUtilizadorExiste.id === idUtilizador
                        &&
                            verificarUtilizadorExiste.utilizador === "ADMIN") {
                        const atualizarInformacaoBasicaParticipante = yield prisma_1.prisma.utilizador.update({
                            where: {
                                id: idUtilizador
                            },
                            data: {
                                palavraPasse: (yield result).palavraPasse
                            }
                        }).then((sucesso) => {
                            res.json({ "Atualizações da palavra passe feita com sucesso.": sucesso });
                        }).catch((error) => {
                            res.json(error);
                        });
                    }
                    else {
                        res.json("Para fazer atualização desse perfil. Precisa ter uma conta de participante.");
                    }
                }
            }
        }
        catch (error) {
            res.json(error);
        }
    }
});
exports.AtualizarPalavraPasse = AtualizarPalavraPasse;
