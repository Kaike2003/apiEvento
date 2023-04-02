import { Router } from "express";
import { ControllerRoutesAdmin } from "../../controllers";
import { Autenticacao } from "../../middlewares/AutenticacaoMiddlewares";
import { PermissaoRotasAdmin } from "../../middlewares/PermissaoRotas";

import { RoutesAdmin } from "../enumRoutes";

const permissaoADMIN: string = "ADMIN"


const routerAdmin = Router()

// * Login
routerAdmin.post(RoutesAdmin.loginAdmin,
    ControllerRoutesAdmin.Login)

// * Criar conta
routerAdmin.post(RoutesAdmin.post,
    ControllerRoutesAdmin.Create)

// * Verificar conta
routerAdmin.put(
    RoutesAdmin.verificarContaAdmin,
    ControllerRoutesAdmin.VerificarConta
)

// * Listar todos os administradores da aplicação
routerAdmin.get(
    RoutesAdmin.listaAdministradores,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ListaAdministradores)

// * Listar todos os palestrantes da aplicação
routerAdmin.get(RoutesAdmin.participante,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.Participante)
// * Listar todos os usuários da aplicação
routerAdmin.get(RoutesAdmin.organizador,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.Organizador)

// * Informações básicas do administrador
routerAdmin.get(
    RoutesAdmin.informacaoBasica,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.
        InformacaoBasica)

//* Atualizar palavra passe
routerAdmin.put(RoutesAdmin.atualizarPalavraPasse,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AtualizarPalavraPasse)

//* Atualizar informações básicas
routerAdmin.put(RoutesAdmin.atualizarInformacaoBasica,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AtualizarInformacaoBasica)

//* Sair da aplicação
routerAdmin.get(RoutesAdmin.sair,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.Sair)

// * Eventos publicados
routerAdmin.get(RoutesAdmin.eventosPublicados,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.EventosPublicados)

// * Banir evento
routerAdmin.put(
    RoutesAdmin.banirEvento,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.BanirEventos)

// * Aprovar evento
routerAdmin.put(
    RoutesAdmin.aprovarEvento,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AprovarEvento
)

// * Eventos a espera
routerAdmin.get(
    RoutesAdmin.eventosAespera,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.EventosAespera
)


// * Categoria
routerAdmin.post(RoutesAdmin.criarCategoria,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.CriarCategoria)

routerAdmin.get(RoutesAdmin.listarCategoria,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ListarCategoria)

routerAdmin.delete(RoutesAdmin.apagarCategoria,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ApagarCategoria)

routerAdmin.put(RoutesAdmin.atualizarCategoria,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AtualizarCategoria)

// * TipoBilhete
routerAdmin.post(RoutesAdmin.criarTipoBilhete,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.CriarTipoBilhete)

routerAdmin.get(RoutesAdmin.listarTipoBilhete,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ListarTipoBilhete)

routerAdmin.delete(RoutesAdmin.apagarTipoBilhete,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ApagarTipoBilhete)

routerAdmin.put(RoutesAdmin.atualizarTipoBilhete,
    Autenticacao,
    PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AtualizarTipoBilhete)

// * Recuperar senha
routerAdmin.put(RoutesAdmin.recuperarSenhaAdmin,
    ControllerRoutesAdmin.RecuperarSenha)


export { routerAdmin }