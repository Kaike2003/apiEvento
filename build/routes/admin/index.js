"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAdmin = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const AutenticacaoMiddlewares_1 = require("../../middlewares/AutenticacaoMiddlewares");
const PermissaoRotas_1 = require("../../middlewares/PermissaoRotas");
const permissaoADMIN = "ADMIN";
const routerAdmin = (0, express_1.Router)();
exports.routerAdmin = routerAdmin;
// * Login
routerAdmin.post("/loginAdmin" /* RoutesAdmin.loginAdmin */, controllers_1.ControllerRoutesAdmin.Login);
// * Criar conta
routerAdmin.post("/create" /* RoutesAdmin.post */, controllers_1.ControllerRoutesAdmin.Create);
// * Contacto
routerAdmin.post("/contacto" /* RoutesAdmin.contacto */, controllers_1.ControllerRoutesAdmin.Contacto);
// * Verificar conta
routerAdmin.put("/verificarAdmin/:idUtilizador" /* RoutesAdmin.verificarContaAdmin */, controllers_1.ControllerRoutesAdmin.VerificarConta);
// * Listar todos os administradores da aplicação
routerAdmin.get("/administradores/listaAdministradores" /* RoutesAdmin.listaAdministradores */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.ListaAdministradores);
// * Listar todos os participantes da aplicação
routerAdmin.get("/usuarios/participante" /* RoutesAdmin.participante */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.Participante);
// * Listar todos os usuários da aplicação
routerAdmin.get("/usuarios/organizador" /* RoutesAdmin.organizador */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.Organizador);
// * Informações básicas do administrador
routerAdmin.get("/perfil/:idUtilizador/informacao" /* RoutesAdmin.informacaoBasica */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.
    InformacaoBasica);
//* Atualizar palavra passe
routerAdmin.put("/perfil/:idUtilizador/atualizarPalavraPasse" /* RoutesAdmin.atualizarPalavraPasse */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.AtualizarPalavraPasse);
//* Atualizar informações básicas
routerAdmin.put("/perfil/:idUtilizador/atualizarInformacaoBasica" /* RoutesAdmin.atualizarInformacaoBasica */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.AtualizarInformacaoBasica);
//* Sair da aplicação
routerAdmin.get("/perfil/sair" /* RoutesAdmin.sair */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.Sair);
// * Eventos publicados
routerAdmin.get("/eventos/publicados" /* RoutesAdmin.eventosPublicados */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.EventosPublicados);
// * Banir evento
routerAdmin.put("/eventos/banido/:idEvento" /* RoutesAdmin.banirEvento */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.BanirEventos);
// * Eventos banidos
routerAdmin.get("/eventos/banidos" /* RoutesAdmin.eventosBanidos */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.EventosBanidos);
// * Aprovar evento
routerAdmin.put("/eventos/aprovarEventos/:idEvento" /* RoutesAdmin.aprovarEvento */, AutenticacaoMiddlewares_1.Autenticacao, (0, PermissaoRotas_1.PermissaoRotasAdmin)(permissaoADMIN), controllers_1.ControllerRoutesAdmin.AprovarEvento);
// * Eventos a espera
routerAdmin.get("/eventos/eventosEspera" /* RoutesAdmin.eventosAespera */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.EventosAespera);
// * Categoria
routerAdmin.post("/categoria" /* RoutesAdmin.criarCategoria */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.CriarCategoria);
routerAdmin.get("/categoria/todasCategoria" /* RoutesAdmin.listarCategoria */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.ListarCategoria);
routerAdmin.delete("/categoria/apagarCategoria/:id" /* RoutesAdmin.apagarCategoria */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.ApagarCategoria);
routerAdmin.put("/categoria/atualizarCategoria/:id" /* RoutesAdmin.atualizarCategoria */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.AtualizarCategoria);
// * TipoBilhete
routerAdmin.post("/tipoBilhete" /* RoutesAdmin.criarTipoBilhete */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.CriarTipoBilhete);
routerAdmin.get("/tipoBilhete/todosTipobilhete" /* RoutesAdmin.listarTipoBilhete */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.ListarTipoBilhete);
routerAdmin.delete("/tipoBilhete/apagarTipoBilhete/:id" /* RoutesAdmin.apagarTipoBilhete */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.ApagarTipoBilhete);
routerAdmin.put("/tipoBilhete/atualizarTipobilhete/:id" /* RoutesAdmin.atualizarTipoBilhete */, 
// Autenticacao,
// PermissaoRotasAdmin(permissaoADMIN),
controllers_1.ControllerRoutesAdmin.AtualizarTipoBilhete);
// * Recuperar senha
routerAdmin.put("/recuperarSenha" /* RoutesAdmin.recuperarSenhaAdmin */, controllers_1.ControllerRoutesAdmin.RecuperarSenha);
// * Listar todos bilhetes
routerAdmin.get("/listarTodosBilhetes" /* RoutesAdmin.listarTodosBilhete */, controllers_1.ControllerRoutesAdmin.ListarTodosBilhete);
// * Listar todas categorias
routerAdmin.get("/listarTodasCategorias" /* RoutesAdmin.listarTodasCategoria */, controllers_1.ControllerRoutesAdmin.ListarTodasCategoria);
// * Listar todos eventos
routerAdmin.get("/listarTodosEventos" /* RoutesAdmin.listarTodosEventos */, controllers_1.ControllerRoutesAdmin.ListarTodosEventos);
// * Listar todos palestrante
routerAdmin.get("/listarTodosPalestrantes" /* RoutesAdmin.listarTodosPalestrantes */, controllers_1.ControllerRoutesAdmin.ListarTodosPalestrante);
// * Listar todos oradores
routerAdmin.get("/listarTodosOradores" /* RoutesAdmin.listarTodosOradores */, controllers_1.ControllerRoutesAdmin.ListarTodosOrador);
// * Listar todos palestrante com relacionamento com evento
routerAdmin.get("/listarTodosPalestrantesId" /* RoutesAdmin.listarTodosPalestrantesId */, controllers_1.ControllerRoutesAdmin.ListarTodosPalestranteId);
// * Listar todos oradores com relacionamento com evento
routerAdmin.get("/listarTodosOradoresId" /* RoutesAdmin.listarTodosOradoresId */, controllers_1.ControllerRoutesAdmin.ListarTodosOradorId);
// * Listar item bilhete da aplicacao
routerAdmin.get("/itemBilhete" /* RoutesAdmin.itemBilhete */, controllers_1.ControllerRoutesAdmin.ListarItemBilhete);
// * Listar todos pagamentos
routerAdmin.get("/listarPagamentos" /* RoutesAdmin.listarPagamentos */, controllers_1.ControllerRoutesAdmin.ListarPagamentos);
// * Aprovar pagamento
routerAdmin.put("/aprovarPagamento/:idCompra/:idUtilizador" /* RoutesAdmin.aprovarPagamento */, controllers_1.ControllerRoutesAdmin.AprovarPagamento);
// * Pagamentos aprovados
routerAdmin.get("/pagamentoAprovados" /* RoutesAdmin.pagamentoAprovados */, controllers_1.ControllerRoutesAdmin.PagamentosAprovados);
// * Cancelar pagamento
routerAdmin.delete("/cancelarPagamento/:idCompra/:idUtilizador" /* RoutesAdmin.cancelarPagamento */, controllers_1.ControllerRoutesAdmin.CancelarPagamento);
// * Listar todos usuarios
routerAdmin.get("/listarTodosUsuarios" /* RoutesAdmin.listarTodosUsuarios */, controllers_1.ControllerRoutesAdmin.ListarTodosUsuarios);
// * Estatistica
// * utilizadores
routerAdmin.get("/utilizadores" /* RoutesAdmin.utilizadores */, controllers_1.ControllerRoutesAdmin.EstatisticaUtilizador);
// * eventos publicados
routerAdmin.get("/eventosPublicadosEstatistica" /* RoutesAdmin.eventosPublicadosEstatistica */, controllers_1.ControllerRoutesAdmin.EstatisticaEventosPublicados);
// * categorias
routerAdmin.get("/categoriasEstatistica" /* RoutesAdmin.categoriasEstatistica */, controllers_1.ControllerRoutesAdmin.EstatisticaCategorias);
// * Compras
routerAdmin.get("/comprasEstatistica" /* RoutesAdmin.comprasEstatistica */, controllers_1.ControllerRoutesAdmin.EstatisticaCompra);
routerAdmin.get("/pagamentoEventoFeito" /* RoutesAdmin.pagamentoEventoFeito */, controllers_1.ControllerRoutesAdmin.PagamentoEventoFeito);
routerAdmin.get("/pagamentoEvento" /* RoutesAdmin.pagamentoEvento */, controllers_1.ControllerRoutesAdmin.PagamentoEvento);
routerAdmin.put("/eventoPago/:idEvento" /* RoutesAdmin.eventoPago */, controllers_1.ControllerRoutesAdmin.EventoPago);
routerAdmin.get("/listarTodasCompras" /* RoutesAdmin.listarTodasCompras */, controllers_1.ControllerRoutesAdmin.ListarTodasComprasPagas);
