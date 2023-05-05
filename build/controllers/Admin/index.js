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
exports.ControllerRoutesAdmin = void 0;
const login = __importStar(require("./Login"));
const criar = __importStar(require("./CriarAdmin"));
const listaAdministradores = __importStar(require("./Administradores/ListaAdministradores"));
const eventosPublicados = __importStar(require("./Eventos/EventosPublicados"));
const participante = __importStar(require("./Usuarios/Participante"));
const organizador = __importStar(require("./Usuarios/Organizador"));
const informacaoBasica = __importStar(require("./Perfil/InformacaoBasica"));
const atualizarPalavraPasse = __importStar(require("./Perfil/AtualizarPalavraPasse"));
const atualizarInformacaoBasica = __importStar(require("./Perfil/AtualizarInformacaoBasica"));
const sair = __importStar(require("./Perfil/Sair"));
// * Banir evento
const banirEvento = __importStar(require("./Eventos/BanirEventos"));
// * Categoria
const criarCategoria = __importStar(require("./Categoria/CriarCategoria"));
const listarCategoria = __importStar(require("./Categoria/ListarCategoria"));
const apagarCategoria = __importStar(require("./Categoria/ApagarCategoria"));
const atualizarCategoria = __importStar(require("./Categoria/AtualizarCategoria"));
// * TipoEvento
const criarTipoBilhete = __importStar(require("./TipoBilhete/CriarTipoBilhete"));
const listarTipoBilhete = __importStar(require("./TipoBilhete/ListarTipoBilhete"));
const apagarTipoBilhete = __importStar(require("./TipoBilhete/ApagarTipoBilhete"));
const atualizarTipoBilhete = __importStar(require("./TipoBilhete/AtualizarTipoBilhete"));
const verificarConta = __importStar(require("./verificarConta/VerificarConta"));
// * Aprovar evento
const aprovarEvento = __importStar(require("./Eventos/AprovarEvento"));
const eventosAespera = __importStar(require("./Eventos/EventosAespera"));
// * Recuperar senha
const recuperarsenhaAdmin = __importStar(require("./RecuperarSenhaAdmin"));
// * Eventos banidos
const eventosbanidos = __importStar(require("./Eventos/EventosBanidos"));
// * Listar todos os bilhetes
const listarTodosBilhete = __importStar(require("./Eventos/Bilhete/ListarTodosBilhete"));
// * Listar todas as categorias
const listarTodasCategorias = __importStar(require("./Eventos/Categoria/ListarTodasCategoria"));
// * Listar todos eventos
const listarTodosEventos = __importStar(require("./Eventos/ListarTodosEventos"));
// * Listar todos oradores
const listarTodosOradores = __importStar(require("./Eventos/Orador/ListarTodosOrador"));
// * Listar todos palestrante
const listarTodosPalestrantes = __importStar(require("./Eventos/Palestrante/ListarTodosPalestrante"));
// * Listar todos oradores com relacionamento com evento
const listarTodosOradoresId = __importStar(require("./Eventos/Orador/ListarTodosOradorId"));
// * Listar todos palestrante com relacionamento com evento
const listarTodosPalestrantesId = __importStar(require("./Eventos/Palestrante/ListarTodosPalestranteId"));
// * Listar todos item  bilhetes
const itemBilhete = __importStar(require("./Eventos/Bilhete/ListarItemBilhete"));
// * Listar todos os pagamentos
const listarPagamentos = __importStar(require("./AprovarPagamento/ListarPagamentos"));
const listarTodosUsuarios = __importStar(require("./ListarTodosUsuarios"));
// * Listar aprovarPagamento
const aprovarPagamento = __importStar(require("./AprovarPagamento/AprovarPagamento"));
// * Listar pagamentosAprovados
const pagamentoAprovados = __importStar(require("./AprovarPagamento/PagamentosAprovados"));
// * Cancelar pagamento 
const cancelarPagamento = __importStar(require("./AprovarPagamento/CancelarPagamento"));
// * Estatistica de todos utilizadores da aplicação
const utilizadores = __importStar(require("./Estatisitica/Utilizadores"));
// * Estatistica de todos eventos publicados
const eventosPublicadosEstatistica = __importStar(require("./Estatisitica/EventosPublicados"));
// * Estatistica de todas categorias
const categoriasEstatistica = __importStar(require("./Estatisitica/Categorias"));
// * Estatistica de todas compras
const comprasEstatistica = __importStar(require("./Estatisitica/Compras"));
// * Pagamento Evento feito
const pagamentoEventoFeito = __importStar(require("./Eventos/Pagamento/PagamentoEventoFeito"));
// * Pagamento evento 
const pagamentoEvento = __importStar(require("./Eventos/Pagamento/PagamentoEvento"));
// * Evento Pago
const eventoPago = __importStar(require("./Eventos/Pagamento/EventoPago"));
// * Listar todas compras pagas
const listarComprasPagas = __importStar(require("./Eventos/Bilhete/ListarTodasCompras"));
// * Contacto 
const contacto = __importStar(require("./Contacto/Conctacto"));
exports.ControllerRoutesAdmin = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, login), criar), listaAdministradores), eventosPublicados), banirEvento), aprovarEvento), eventosAespera), organizador), participante), informacaoBasica), atualizarPalavraPasse), atualizarInformacaoBasica), sair), criarCategoria), listarCategoria), apagarCategoria), atualizarCategoria), criarTipoBilhete), listarTipoBilhete), apagarTipoBilhete), atualizarTipoBilhete), eventosbanidos), listarTodosBilhete), listarTodasCategorias), listarTodosEventos), listarTodosPalestrantes), listarTodosOradores), listarTodosOradoresId), listarTodosPalestrantesId), itemBilhete), listarPagamentos), aprovarPagamento), listarTodosUsuarios), pagamentoAprovados), cancelarPagamento), utilizadores), eventosPublicadosEstatistica), categoriasEstatistica), comprasEstatistica), pagamentoEventoFeito), pagamentoEvento), contacto), eventoPago), listarComprasPagas), verificarConta), recuperarsenhaAdmin);
