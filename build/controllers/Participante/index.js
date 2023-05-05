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
exports.ControllerParticipante = void 0;
const login = __importStar(require("./Login"));
const create = __importStar(require("./CreateParticipante"));
// * Perfil
const atualizarInformacaoBasica = __importStar(require("./Perfil/AtualizarInformacoes/AtualizarInformacaoBasica"));
const atualizarPalavraPasse = __importStar(require("./Perfil/AtualizarPalavraPasse/AtualizarPalavraPasse"));
const informacaoBasica = __importStar(require("./Perfil/InformacaoBasica"));
const historicoCompra = __importStar(require("./Perfil/Compra/HistoricoCompra"));
const detalheCompra = __importStar(require("./Perfil/Compra/DetalheCompra"));
const notificacoes = __importStar(require("./Perfil/Notificacoes/Notificacoes"));
const sair = __importStar(require("./Perfil/Sair"));
// * Filtro
const categoriaEvento = __importStar(require("./Filtro/CategoriaEvento"));
const mes = __importStar(require("./Filtro/Mes"));
// * Meus Eventos
const historico = __importStar(require("./MeusEventos/Historico"));
const bilheteHistorico = __importStar(require("./MeusEventos/BilheteHistorico"));
// * Eventos
const visualizarEvento = __importStar(require("./Visualizar/VisualizarEvento"));
const visualizarPalestrante = __importStar(require("./Visualizar/VisualizarPalestrante"));
// * Tipo evento
const tipoEvento = __importStar(require("./TipoEvento/TipoEvento"));
const tipoEventoDetalhe = __importStar(require("./TipoEvento/TipoEventoDetalhe"));
// * Bilhete e Compra
const reserva = __importStar(require("./Bilhete/Reserva/Reserva"));
// * Verificar conta
const verificarContaParticipante = __importStar(require("./VerificarConta/VerificarConta"));
// * RecuperarSenha
const recuperarSenhaParticipante = __importStar(require("./RecuperarSenhaParticipante"));
// * Listarparticipante
const listarparticipante = __importStar(require("./ListarParticipante"));
// * EventosPáginaPrincipal
const eventosPaginaPrincipal = __importStar(require("./PaginaPrincipal/PaginaPrincipal"));
// * EventosNovos
const novosEventos = __importStar(require("./NovosEventos/NovosEventos"));
const eventosTodosLimiteVermais = __importStar(require("./TodosEventoVermais/EventosTodosLimite"));
const eventosTodosVermais = __importStar(require("./TodosEventoVermais/EventosTodos"));
const eventosNovosLimiteVermais = __importStar(require("./NovosEventosVermais/EventosNovosLimite"));
const eventosNovosVermais = __importStar(require("./NovosEventosVermais/EventosNovos"));
// * Informação evento participante
const informacaoEventoParticipante = __importStar(require("./MeusEventos/InformacaoEventoParticipante"));
// * Listar teatro
const teatro = __importStar(require("./TipoEvento/Teatro/Teatro"));
const teatroLimite = __importStar(require("./TipoEvento/Teatro/TeatroLimite"));
// * Listar Concerto
const concerto = __importStar(require("./TipoEvento/Concerto/Concerto"));
const concertoLimite = __importStar(require("./TipoEvento/Concerto/ConcertoLimite"));
// * Listar Shows
const shows = __importStar(require("./TipoEvento/Shows/Shows"));
const showsLimite = __importStar(require("./TipoEvento/Shows/ShowsLimite"));
// * Listar Palestra
const palestra = __importStar(require("./TipoEvento/Palestra/Palestra"));
const palestraLimite = __importStar(require("./TipoEvento/Palestra/PalestraLimite"));
// * Listar Seminário
const seminario = __importStar(require("./TipoEvento/Seminario/Seminario"));
const seminarioLimite = __importStar(require("./TipoEvento/Seminario/SeminarioLimite"));
// * Adicionar comprovativo
const adicionarComprovativo = __importStar(require("./MeusEventos/AdicionarComprovativo"));
// * Historico pago
const historicoPago = __importStar(require("./MeusEventos/HistoricoPago"));
// * Historico nao pago
const historicoNaoPago = __importStar(require("./MeusEventos/HistoricoNaoPago"));
// * Adicionar foto participante 
const adicionarFotoParticipante = __importStar(require("./AdicionarFotoParticipante"));
exports.ControllerParticipante = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, create), login), atualizarInformacaoBasica), atualizarPalavraPasse), informacaoBasica), historicoCompra), notificacoes), detalheCompra), sair), categoriaEvento), mes), historico), bilheteHistorico), visualizarEvento), visualizarPalestrante), tipoEvento), tipoEventoDetalhe), reserva), verificarContaParticipante), recuperarSenhaParticipante), listarparticipante), eventosPaginaPrincipal), novosEventos), informacaoEventoParticipante), eventosTodosLimiteVermais), eventosTodosVermais), eventosNovosLimiteVermais), eventosNovosVermais), teatro), teatroLimite), concerto), concertoLimite), shows), showsLimite), palestra), palestraLimite), seminario), seminarioLimite), adicionarComprovativo), historicoPago), historicoNaoPago), adicionarFotoParticipante);
