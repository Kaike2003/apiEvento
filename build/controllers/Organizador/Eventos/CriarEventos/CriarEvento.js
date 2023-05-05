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
exports.CriarEvento = void 0;
const prisma_1 = require("../../../../prisma");
const validation_1 = require("../../../../validation");
const CriarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUtilizador } = req.params;
    const { nome, descricao, dataInicio, dataTermino, horaInicio, horaTermino, foto, provincia, municipio, bairro, categoriaId } = req.body;
    console.log(nome, descricao, dataInicio, dataTermino, horaInicio, horaTermino, foto, provincia, municipio, bairro, categoriaId);
    const result = validation_1.EventoOmit.parse({
        nome: nome,
        descricao: descricao,
        dataInicio: new Date(dataInicio),
        dataTermino: new Date(dataTermino),
        horaInicio: new Date(`${dataInicio} ${horaInicio}`),
        horaTermino: new Date(`${dataTermino} ${horaTermino}`),
        foto: "image.png",
        provincia: provincia,
        municipio: municipio,
        bairro: bairro,
        categoriaId: categoriaId
    });
    const hora_Validacao = {
        horaInicio: new Date(`${dataInicio} ${"00:00:00"}`).getHours(),
        horaTermino: new Date(`${dataInicio} ${"23:00:00"}`).getHours()
    };
    try {
        const verificarUtilizadorExiste = yield prisma_1.prisma.utilizador.findFirst({
            where: {
                id: idUtilizador
            }
        });
        if ((verificarUtilizadorExiste === null || verificarUtilizadorExiste === void 0 ? void 0 : verificarUtilizadorExiste.id) === idUtilizador
            &&
                (verificarUtilizadorExiste === null || verificarUtilizadorExiste === void 0 ? void 0 : verificarUtilizadorExiste.utilizador) === "ORGANIZADOR") {
            if (result.dataInicio.getDate() === result.dataTermino.getDate()
                &&
                    result.dataInicio.getMonth() === result.dataTermino.getMonth()) {
                if (hora_Validacao.horaInicio <= result.horaInicio.getHours()
                    &&
                        hora_Validacao.horaTermino >= result.horaTermino.getHours()
                    && hora_Validacao.horaInicio <= result.horaTermino.getHours()
                    &&
                        result.horaInicio.getHours() <= result.horaTermino.getHours()) {
                    console.log("Pode criar evento");
                    const criarEvento = yield prisma_1.prisma.evento.create({
                        data: {
                            nome: result.nome,
                            descricao: result.descricao,
                            dataInicio: result.dataInicio,
                            dataTermino: result.dataTermino,
                            estado: "DESPONIVEL",
                            horaInicio: result.horaInicio,
                            horaTermino: result.horaTermino,
                            provincia: result.provincia,
                            municipio: result.municipio,
                            bairro: bairro,
                            banido: false,
                            publicado: false,
                            aprovado: false,
                            foto: "padrao.png",
                            utilizadorId: idUtilizador,
                            categoriaId: categoriaId,
                            visualizacao: 0
                        }
                    }).then((sucesso) => {
                        res.json(sucesso);
                    }).catch((error) => {
                        res.json(error);
                    });
                }
                else {
                    console.log("Verifique o horário do evento");
                    res.status(400).json("Verifique o horário do evento");
                }
            }
            else {
                res.status(400).json("A data de inicio e termino de ventos devem ser as mesmas.");
                console.log("A data de inicio e termino de ventos devem ser as mesmas.");
            }
        }
        else {
            res.json({
                "Possiveis erros": {
                    "UtilizadorId": "Verifique o id do utilizador para saber se é um administrador, organizador ou participante.",
                    "Organizador": "Essa conta não é de organizador. Não pode criar evento",
                }
            });
        }
    }
    catch (error) {
        res.json({ "Erro criar evento": error });
    }
});
exports.CriarEvento = CriarEvento;
