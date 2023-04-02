import { Router } from "express";
import { RoutesOrganizador } from "../enumRoutes";
import { ControllerRoutesOrganizador } from '../../controllers/Organizador/index';
import { upload } from "../../middlewares/uploadImage";
import { PermissaoRotasOrganizador } from "../../middlewares/PermissaoRotas";
import { Autenticacao } from "../../middlewares/AutenticacaoMiddlewares";
import { EmailAutenticacao } from "../../middlewares/EmailAutenticacao";

const permissaoOrganizador: string = "ORGANIZADOR"

const routerOrganizador = Router()

routerOrganizador.post(RoutesOrganizador.criarOrganizador,
    ControllerRoutesOrganizador.CreateOrg)

routerOrganizador.post(RoutesOrganizador.loginOganizador, ControllerRoutesOrganizador.LoginOrganizador)

// * Verificar conta
routerOrganizador.put(
    RoutesOrganizador.verificarContaOrganizador,
    ControllerRoutesOrganizador.VerificarConta
)


// * Perfil

routerOrganizador.put(
    RoutesOrganizador.atualizarInformacaoBasica,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.AtualizarInformacaoBasica)

routerOrganizador.put(RoutesOrganizador.atualizarPalavraPasse,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.AtualizarPalavraPasse)

routerOrganizador.get(RoutesOrganizador.informacaoBasica,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.InformacaoBasica)

routerOrganizador.get(RoutesOrganizador.sair,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.Sair)

// * Evento


// * Criar Evento
routerOrganizador.post(
    RoutesOrganizador.criarEvento,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.CriarEvento)

// * Publicar Evento
routerOrganizador.get(
    RoutesOrganizador.publicarEvento,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.PublicarEvento
)

// * Listar Evento
routerOrganizador.get(
    RoutesOrganizador.listarEvento,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.ListarEventos)

// *Adicionar Foto
routerOrganizador.put(
    RoutesOrganizador.adicionarFotoEvento,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    upload.single("foto"),
    ControllerRoutesOrganizador.AdicionarFotoEvento)

// * Editar Evento
routerOrganizador.put(
    RoutesOrganizador.editarEvento,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.EditarEvento)

// * Palestrante


// * Adicionar foto palestrante
routerOrganizador.put(
    RoutesOrganizador.adicionarFotoPalestrante,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    upload.single("foto"),
    ControllerRoutesOrganizador.AdicionarFotoPalestrante)

// * Criar palestrante
routerOrganizador.post(
    RoutesOrganizador.criarPalestrante,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.CriarPalestrante)

// * Apagar palestrante
routerOrganizador.delete(
    RoutesOrganizador.apagarPalestrante,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.ApagarPalestrante)

// * Atualizar palestrante
routerOrganizador.put(
    RoutesOrganizador.atualizarPalestrante,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.AtualizarPalestrante)

// * Listar palestrante
routerOrganizador.get(
    RoutesOrganizador.listaPalestrante,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador), ControllerRoutesOrganizador.ListarPalestrante)


// * Orador

// * Criar orador
routerOrganizador.post(
    RoutesOrganizador.criarOrador,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.CriarOrador)

// * Apagar orador
routerOrganizador.delete(
    RoutesOrganizador.apagarOrador,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.ApagarOrador)

// * Atualizar orador
routerOrganizador.put(
    RoutesOrganizador.atualizarOrador,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.AtualizarOrador)

// * Listar orador
routerOrganizador.get(
    RoutesOrganizador.listaOrador,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.ListarOrador)


// * Historico
routerOrganizador.get(
    RoutesOrganizador.historicoEvento,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.HistoricoEvento
)

// * Bilhete

// * Criar bilhete
routerOrganizador.post(
    RoutesOrganizador.criarBilhete,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.CriarBilhete)

// * Apagar bilhete
routerOrganizador.delete(
    RoutesOrganizador.apagarBilhete,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.ApagarBilhete)

// * Atualizar bilhete
routerOrganizador.put(
    RoutesOrganizador.atualizarBilhete,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.AtualizarBilhete)

// * Listar bilhete
routerOrganizador.get(
    RoutesOrganizador.listaBilhete,
    Autenticacao,
    PermissaoRotasOrganizador(permissaoOrganizador),
    ControllerRoutesOrganizador.ListarBilhete)

// * Recuperar senha
routerOrganizador.put(
    RoutesOrganizador.recuperarSenhaOrganizador,
    ControllerRoutesOrganizador.RecuperarSenha
)

export { routerOrganizador }