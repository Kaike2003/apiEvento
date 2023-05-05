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
exports.TipoEventoDetalhe = void 0;
const TipoEventoDetalhe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        "Informação": "Aqui serão detalhado um único evento e terá o seu tipo",
        "Os campos serão": "nome, descricao, categoria do evento, bilhetes, localização, hora, data de inicio, data de termino, estado do evento, bilhetes desponiveis"
    });
});
exports.TipoEventoDetalhe = TipoEventoDetalhe;
