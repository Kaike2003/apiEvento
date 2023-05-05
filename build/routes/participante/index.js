"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerParticipante = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const PermissaoRotas_1 = require("../../middlewares/PermissaoRotas");
const AutenticacaoMiddlewares_1 = require("../../middlewares/AutenticacaoMiddlewares");
const uploadImageComprovativo_1 = require("../../middlewares/uploadImageComprovativo");
const uploadImageParticipante_1 = require("../../middlewares/uploadImageParticipante");
const permissaoPARTICIPANTE = "PARTICIPANTE";
const routerParticipante = (0, express_1.Router)();
exports.routerParticipante = routerParticipante;
// * Perfil
routerParticipante.post("/create" /* RoutesParticipante.createParticipante */, controllers_1.ControllerParticipante.Create);
routerParticipante.put("/perfil/:idUtilizador/adicionarFotoParticipante" /* RoutesParticipante.adicionarFotoParticipante */, uploadImageParticipante_1.aciicionarParticipanteUpload.single("foto"), AutenticacaoMiddlewares_1.Autenticacao, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.AdicionarFofoParticipante);
routerParticipante.post("/loginParticipante" /* RoutesParticipante.loginParticipante */, controllers_1.ControllerParticipante.LoginParticipante);
routerParticipante.put("/verificarContaParticipante" /* RoutesParticipante.verificarContaParticipante */, controllers_1.ControllerParticipante.VerificarContaParticipante);
routerParticipante.put("/perfil/:idUtilizador/atualizarInformacaoBasica" /* RoutesParticipante.atualizarInformacaoBasica */, AutenticacaoMiddlewares_1.Autenticacao, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.AtualizarInformacaoBasica);
routerParticipante.put("/perfil/:idUtilizador/atualizarPalavraPasse" /* RoutesParticipante.atualizarPalavraPasse */, AutenticacaoMiddlewares_1.Autenticacao, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.AtualizarPalavraPasse);
routerParticipante.get("/perfil/:idUtilizador/informacao" /* RoutesParticipante.informacaoBasica */, AutenticacaoMiddlewares_1.Autenticacao, 
// PermissaoRotasParticipante(permissaoPARTICIPANTE),
controllers_1.ControllerParticipante.InformacaoBasica);
routerParticipante.get("/perfil/sair" /* RoutesParticipante.sair */, 
// Autenticacao,
(0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.Sair);
routerParticipante.get("/perfil/compra/historicoCompra/" /* RoutesParticipante.historicoCompra */, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.HistoricoCompra);
routerParticipante.get("/perfil/notificacoes/" /* RoutesParticipante.notificacoes */, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.Notificacoes);
routerParticipante.get("/perfil/compra/detalheCompra" /* RoutesParticipante.detalhaCompra */, 
// PermissaoRotasParticipante(permissaoPARTICIPANTE),
controllers_1.ControllerParticipante.DetalheCompra);
// * Filtro
routerParticipante.get("/filtro/categoriaEvento/:idCategoria" /* RoutesParticipante.categoriaEvento */, 
// PermissaoRotasParticipante(permissaoPARTICIPANTE),
controllers_1.ControllerParticipante.CategoriaEvento);
routerParticipante.get("/filtro/mes/:numeroData" /* RoutesParticipante.mes */, 
// PermissaoRotasParticipante(permissaoPARTICIPANTE),
controllers_1.ControllerParticipante.Mes);
// * Meus eventos
routerParticipante.get("/meusEventos/historico/:idUtilizador" /* RoutesParticipante.historico */, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.Historico);
routerParticipante.get("/meusEventos/historico/bilhete/:idUtilizador" /* RoutesParticipante.bilhetehistorico */, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.
    BilheteHistorico);
// * Eventos
// routerParticipante.get(
//     RoutesParticipante.eventosNovos,
//     // PermissaoRotasParticipante(permissaoPARTICIPANTE),
//     ControllerParticipante.EventosNovos)
// routerParticipante.get(
//     RoutesParticipante.eventosTodos,
//     // PermissaoRotasParticipante(permissaoPARTICIPANTE),
//     ControllerParticipante.EventosTodos)
routerParticipante.get("/eventos/visualizarEvento/:idEvento" /* RoutesParticipante.visualizarEvento */, 
// PermissaoRotasParticipante(permissaoPARTICIPANTE),
controllers_1.ControllerParticipante.VisualizarEvento);
routerParticipante.get("/eventos/visualizarPalestrante/:idEvento" /* RoutesParticipante.visualiarPalestrante */, 
// PermissaoRotasParticipante(permissaoPARTICIPANTE),
controllers_1.ControllerParticipante.VisualiarPalestrante);
// * Tipo Evento
routerParticipante.get("/tipoEvento" /* RoutesParticipante.tipoEvento */, 
// PermissaoRotasParticipante(permissaoPARTICIPANTE),
controllers_1.ControllerParticipante.TipoEvento);
routerParticipante.get("/tipoEvento/detalhe" /* RoutesParticipante.tipoEventoDetalhe */, 
// PermissaoRotasParticipante(permissaoPARTICIPANTE),
controllers_1.ControllerParticipante.TipoEventoDetalhe);
// *  Compra
routerParticipante.post("/eventos/visualizarEvento/:idEvento/reserva/:idUtilizador" /* RoutesParticipante.reserva */, AutenticacaoMiddlewares_1.Autenticacao, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.Reserva);
// * Recuperar Senha
routerParticipante.put("/recuperarSenha" /* RoutesParticipante.recuperarSenhaParticipante */, controllers_1.ControllerParticipante.RecuperarSenha);
// * Listar participante
routerParticipante.get("/listarParticipante" /* RoutesParticipante.listarparticipante */, controllers_1.ControllerParticipante.ListarParticipante);
// * Eventos da página principal
routerParticipante.get("/paginaPrincipal" /* RoutesParticipante.eventosPaginaPrincipal */, controllers_1.ControllerParticipante.PaginaPrincipalEventos);
// * Eventos novos página principal
routerParticipante.get("/novosEventosPaginaPrincipal" /* RoutesParticipante.novosEventos */, controllers_1.ControllerParticipante.NovosEventos);
// * Informacão evento participante
routerParticipante.get("/meusEventos/historico/:idUtilizador/:idBilhete/evento" /* RoutesParticipante.informacaoEventoParticipante */, controllers_1.ControllerParticipante.InformacaoEventoParticipante);
// * Eventos todos limite
routerParticipante.get("/todosEventos?limite" /* RoutesParticipante.eventosTodosLimite */, controllers_1.ControllerParticipante.EventosTodosLimiteVermais);
// * Eventos todos 
routerParticipante.get("/todosEventos" /* RoutesParticipante.eventosTodos */, controllers_1.ControllerParticipante.EventosTodosVermais);
// * Eventos novos 
routerParticipante.get("/novosEventos" /* RoutesParticipante.eventosNovos */, controllers_1.ControllerParticipante.EventosNovosVermais);
// * Eventos novos limite
routerParticipante.get("/novosEventos?limite" /* RoutesParticipante.eventosNovosLimite */, controllers_1.ControllerParticipante.EventosNovosLimiteVermais);
// * Listar teatro
routerParticipante.get("/teatroEventos" /* RoutesParticipante.listarTeatro */, controllers_1.ControllerParticipante.Teatro);
// * Listar teatro limite
routerParticipante.get("/teatroEventos?limite" /* RoutesParticipante.listarTeatroLimite */, controllers_1.ControllerParticipante.TeatroLimite);
// * Listar concerto
routerParticipante.get("/concertoEventos" /* RoutesParticipante.listarConcerto */, controllers_1.ControllerParticipante.Concerto);
// * Listar concerto limite
routerParticipante.get("/concertoEventos?limite" /* RoutesParticipante.listarConcertoLimite */, controllers_1.ControllerParticipante.ConcertoLimite);
// * Listar seminário
routerParticipante.get("/seminarioEventos" /* RoutesParticipante.listarSeminario */, controllers_1.ControllerParticipante.Seminario);
// * Listar seminário limite
routerParticipante.get("/seminarioEventos?limite" /* RoutesParticipante.listarSeminariotoLimite */, controllers_1.ControllerParticipante.SeminarioLimite);
// * Listar palestra
routerParticipante.get("/palestraEventos" /* RoutesParticipante.listarPalestra */, controllers_1.ControllerParticipante.Palestra);
// * Listar palestra limite
routerParticipante.get("/palestraEventos?limite" /* RoutesParticipante.listarPalestraLimite */, controllers_1.ControllerParticipante.PalestraLimite);
// * Listar shows
routerParticipante.get("/showsEventos" /* RoutesParticipante.listarShows */, controllers_1.ControllerParticipante.Shows);
// * Listar shows limite
routerParticipante.get("/showsEventos?limite" /* RoutesParticipante.listarShowsLimite */, controllers_1.ControllerParticipante.ShowsLimite);
// * Adicionar comprovativo
routerParticipante.put("/adicionarComprovaito/:idCompra/:idUtilizador" /* RoutesParticipante.adicionarComprovaito */, uploadImageComprovativo_1.adicionarComprovativoUpload.single("foto"), AutenticacaoMiddlewares_1.Autenticacao, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.AdicioanarComprovativo);
// * HistoricoPago
routerParticipante.get("/meusEventos/historicoPago/:idUtilizador" /* RoutesParticipante.historicoPago */, AutenticacaoMiddlewares_1.Autenticacao, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.HistoricoPago);
// * HistoricoNaoPago
routerParticipante.get("/meusEventos/historicoNaoPago/:idUtilizador" /* RoutesParticipante.historicoNaoPago */, AutenticacaoMiddlewares_1.Autenticacao, (0, PermissaoRotas_1.PermissaoRotasParticipante)(permissaoPARTICIPANTE), controllers_1.ControllerParticipante.HistoricoNaoPago);
