"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerOrganizador = void 0;
const express_1 = require("express");
const index_1 = require("../../controllers/Organizador/index");
const uploadImage_1 = require("../../middlewares/uploadImage");
const uploadImagePalestrante_1 = require("../../middlewares/uploadImagePalestrante");
const uploadImageOrganizador_1 = require("../../middlewares/uploadImageOrganizador");
const permissaoOrganizador = "ORGANIZADOR";
const routerOrganizador = (0, express_1.Router)();
exports.routerOrganizador = routerOrganizador;
routerOrganizador.post("/create" /* RoutesOrganizador.criarOrganizador */, index_1.ControllerRoutesOrganizador.CreateOrg);
routerOrganizador.post("/loginOrganizador" /* RoutesOrganizador.loginOganizador */, index_1.ControllerRoutesOrganizador.LoginOrganizador);
// * Verificar conta
routerOrganizador.put("/verificarContaOrganizador" /* RoutesOrganizador.verificarContaOrganizador */, index_1.ControllerRoutesOrganizador.VerificarConta);
// * Perfil
routerOrganizador.put("/perfil/:idUtilizador/adicionarFotoOrganizador" /* RoutesOrganizador.adicionarFotoOrganizador */, uploadImageOrganizador_1.aciicionarOrganizadorUpload.single("foto"), index_1.ControllerRoutesOrganizador.AdicionarFotoOrganizador);
routerOrganizador.put("/perfil/:idUtilizador/atualizarInformacaoBasica" /* RoutesOrganizador.atualizarInformacaoBasica */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.AtualizarInformacaoBasica);
routerOrganizador.put("/perfil/:idUtilizador/atualizarPalavraPasse" /* RoutesOrganizador.atualizarPalavraPasse */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.AtualizarPalavraPasse);
routerOrganizador.get("/perfil/:idUtilizador/informacao" /* RoutesOrganizador.informacaoBasica */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.InformacaoBasica);
routerOrganizador.get("/perfil/sair" /* RoutesOrganizador.sair */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.Sair);
// * Evento
// * Criar Evento
routerOrganizador.post("/evento/criarEvento/:idUtilizador" /* RoutesOrganizador.criarEvento */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.CriarEvento);
// * Publicar Evento
routerOrganizador.put("/evento/publicar/:idUtilizador/:idEvento" /* RoutesOrganizador.publicarEvento */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.PublicarEvento);
// * Listar Evento
routerOrganizador.get("/evento/lista/:idUtilizador" /* RoutesOrganizador.listarEvento */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.ListarEventos);
// * Adicionar Foto
routerOrganizador.put("/evento/detalhe/editar/:idUtilizador/foto/:idEvento" /* RoutesOrganizador.adicionarFotoEvento */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
uploadImage_1.upload.single("foto"), index_1.ControllerRoutesOrganizador.AdicionarFotoEvento);
// * Editar Evento
routerOrganizador.put("/evento/detalhe/editarEvento/:idUtilizador/:idEvento" /* RoutesOrganizador.editarEvento */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.EditarEvento);
// * Apagar Evento
routerOrganizador.delete("/evento/detalhe/apagarEvento/:idUtilizador/:idEvento" /* RoutesOrganizador.apagarEvento */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.ApagarEvento);
// * Palestrante
// * Adicionar foto palestrante
routerOrganizador.put("/evento/detalhe/editar/:idEvento/palestrante/:idPalestrante/foto" /* RoutesOrganizador.adicionarFotoPalestrante */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
uploadImagePalestrante_1.adicionarFotoPalestranteUpload.single("foto"), index_1.ControllerRoutesOrganizador.AdicionarFotoPalestrante);
// * Criar palestrante
routerOrganizador.post("/evento/detalhe/editar/:idEvento/palestrante" /* RoutesOrganizador.criarPalestrante */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.CriarPalestrante);
// * Apagar palestrante
routerOrganizador.delete("/evento/detalhe/editar/:idEvento/palestrante/:idPalestrante" /* RoutesOrganizador.apagarPalestrante */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.ApagarPalestrante);
// * Atualizar palestrante
routerOrganizador.put("/evento/detalhe/editar/:idEvento/palestrante/:idPalestrante" /* RoutesOrganizador.atualizarPalestrante */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.AtualizarPalestrante);
// * Listar palestrante
routerOrganizador.get("/evento/detalhe/editar/:idEvento/palestrante" /* RoutesOrganizador.listaPalestrante */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.ListarPalestrante);
// * Orador
// * Criar orador
routerOrganizador.post("/evento/detalhe/editar/:idEvento/orador" /* RoutesOrganizador.criarOrador */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.CriarOrador);
// * Apagar orador
routerOrganizador.delete("/evento/detalhe/editar/:idEvento/orador/:idOrador" /* RoutesOrganizador.apagarOrador */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.ApagarOrador);
// * Atualizar orador
routerOrganizador.put("/evento/detalhe/editar/:idEvento/orador/:idOrador" /* RoutesOrganizador.atualizarOrador */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.AtualizarOrador);
// * Listar orador
routerOrganizador.get("/evento/detalhe/editar/:idEvento/orador" /* RoutesOrganizador.listaOrador */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.ListarOrador);
// * Historico
routerOrganizador.get("/evento/historico/:idUtilizador" /* RoutesOrganizador.historicoEvento */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.HistoricoEvento);
// * Bilhete
// * Criar bilhete
routerOrganizador.post("/evento/detalhe/editar/:idEvento/bilhete" /* RoutesOrganizador.criarBilhete */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.CriarBilhete);
// * Apagar bilhete
routerOrganizador.delete("/evento/detalhe/editar/:idEvento/bilhete/:idBilhete" /* RoutesOrganizador.apagarBilhete */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.ApagarBilhete);
// * Atualizar bilhete
routerOrganizador.put("/evento/detalhe/editar/:idEvento/bilhete/:idBilhete" /* RoutesOrganizador.atualizarBilhete */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.AtualizarBilhete);
// * Listar bilhete
routerOrganizador.get("/evento/detalhe/editar/:idEvento/bilhete" /* RoutesOrganizador.listaBilhete */, 
// Autenticacao,
// PermissaoRotasOrganizador(permissaoOrganizador),
index_1.ControllerRoutesOrganizador.ListarBilhete);
// * Recuperar senha
routerOrganizador.put("/recuperarSenha" /* RoutesOrganizador.recuperarSenhaOrganizador */, index_1.ControllerRoutesOrganizador.RecuperarSenha);
