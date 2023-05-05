"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerRoutesOrganizador = void 0;
const loginOrg = __importStar(require("./Login"));
const createOrg = __importStar(require("./CriarOrganizador"));
// * Perfil
const informacaoBasica = __importStar(require("./Perfil/InformacaoBasica"));
const atualizarPalavraPasse = __importStar(require("./Perfil/AtualizarPalavraPasse/AtualizarPalavraPasse"));
const AtualizarInformacoes = __importStar(require("./Perfil/AtualizarInformacoes/AtualizarInformacaoBasica"));
const sair = __importStar(require("./Perfil/Sair"));
// * Evento
// * Criar Evento
const criarEvento = __importStar(require("./Eventos/CriarEventos/CriarEvento"));
// * Publicar Evento
const publicarEvento = __importStar(require("./Eventos/CriarEventos/PublicarEvento"));
const historicoEvento = __importStar(require("./Eventos/Historico/HistoricoEvento"));
// * Adicionar foto do evento
const adicionarFotoEvento = __importStar(require("./Eventos/CriarEventos/AdicionarFotoEvento"));
//* Listar Evento
const listarEvento = __importStar(require("./Eventos/CriarEventos/ListarEventos"));
// * Editar Evento
const editarEvento = __importStar(require("./Eventos/CriarEventos/EditarEvento"));
// * Apagar Evento
const apagarEvento = __importStar(require("./Eventos/CriarEventos/ApagarEvento"));
// * Palestrante
// * Adicionar foto
const adicionarFotoPalestrante = __importStar(require("./Eventos/CriarEventos/Palestrante/AdicionarFotoPalestrante"));
// * Criar Palestrante
const criarPalestrante = __importStar(require("./Eventos/CriarEventos/Palestrante/CriarPalestrante"));
// * Apagar Palestrante
const apagarPalestrante = __importStar(require("./Eventos/CriarEventos/Palestrante/ApagarPalestrante"));
// * Atualizar Palestrante
const atualizarPalestrante = __importStar(require("./Eventos/CriarEventos/Palestrante/AtualizarPalestrante"));
// * Listar Palestrante
const listarPalestrante = __importStar(require("./Eventos/CriarEventos/Palestrante/ListarPalestrante"));
// * Orador
const criarOrador = __importStar(require("./Eventos/CriarEventos/Orador/CriarOrador"));
const listarOrador = __importStar(require("./Eventos/CriarEventos/Orador/ListarOrador"));
const apagarOrador = __importStar(require("./Eventos/CriarEventos/Orador/ApagarOrador"));
const atualizarOrador = __importStar(require("./Eventos/CriarEventos/Orador/AtualizarOrador"));
// * Bilhete
const criarBilhete = __importStar(require("./Eventos/CriarEventos/Bilhete/CriarBilhete"));
const listarBilhete = __importStar(require("./Eventos/CriarEventos/Bilhete/ListarBilhete"));
const apagarBilhete = __importStar(require("./Eventos/CriarEventos/Bilhete/ApagarBilhete"));
const atualizarBilhete = __importStar(require("./Eventos/CriarEventos/Bilhete/AtualizarBilhete"));
// * Verificar conta
const verificarConta = __importStar(require("./VerificarConta/VerificarConta"));
// * Verificar conta
const recuperarSenhaOrganidor = __importStar(require("./RecuperarSenhaOrganizador"));
// * Adicionar foto organizador 
const adicionarFotoOrganizador = __importStar(require("./AdicionarFotoOrganizador"));
exports.ControllerRoutesOrganizador = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, loginOrg), createOrg), informacaoBasica), atualizarPalavraPasse), AtualizarInformacoes), sair), criarEvento), adicionarFotoEvento), publicarEvento), historicoEvento), listarEvento), editarEvento), apagarEvento), adicionarFotoPalestrante), criarPalestrante), apagarPalestrante), atualizarPalestrante), listarPalestrante), criarOrador), apagarOrador), atualizarOrador), listarOrador), criarBilhete), apagarBilhete), atualizarBilhete), listarBilhete), verificarConta), recuperarSenhaOrganidor), adicionarFotoOrganizador);
