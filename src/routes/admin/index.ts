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
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ListaAdministradores)

// * Listar todos os participantes da aplicação
routerAdmin.get(RoutesAdmin.participante,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.Participante)
// * Listar todos os usuários da aplicação
routerAdmin.get(RoutesAdmin.organizador,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.Organizador)

// * Informações básicas do administrador
routerAdmin.get(
    RoutesAdmin.informacaoBasica,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.
        InformacaoBasica)

//* Atualizar palavra passe
routerAdmin.put(RoutesAdmin.atualizarPalavraPasse,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AtualizarPalavraPasse)

//* Atualizar informações básicas
routerAdmin.put(RoutesAdmin.atualizarInformacaoBasica,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AtualizarInformacaoBasica)

//* Sair da aplicação
routerAdmin.get(RoutesAdmin.sair,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.Sair)

// * Eventos publicados
routerAdmin.get(RoutesAdmin.eventosPublicados,
    // Autenticacao,F
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.EventosPublicados)

// * Banir evento
routerAdmin.put(
    RoutesAdmin.banirEvento,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.BanirEventos)

// * Eventos banidos

routerAdmin.get(
    RoutesAdmin.eventosBanidos,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.EventosBanidos)


// * Aprovar evento
routerAdmin.put(
    RoutesAdmin.aprovarEvento,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AprovarEvento
)

// * Eventos a espera
routerAdmin.get(
    RoutesAdmin.eventosAespera,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.EventosAespera
)


// * Categoria
routerAdmin.post(RoutesAdmin.criarCategoria,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.CriarCategoria)

routerAdmin.get(RoutesAdmin.listarCategoria,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ListarCategoria)

routerAdmin.delete(RoutesAdmin.apagarCategoria,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ApagarCategoria)

routerAdmin.put(RoutesAdmin.atualizarCategoria,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AtualizarCategoria)

// * TipoBilhete
routerAdmin.post(RoutesAdmin.criarTipoBilhete,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.CriarTipoBilhete)

routerAdmin.get(RoutesAdmin.listarTipoBilhete,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ListarTipoBilhete)

routerAdmin.delete(RoutesAdmin.apagarTipoBilhete,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.ApagarTipoBilhete)

routerAdmin.put(RoutesAdmin.atualizarTipoBilhete,
    // Autenticacao,
    // PermissaoRotasAdmin(permissaoADMIN),
    ControllerRoutesAdmin.AtualizarTipoBilhete)

// * Recuperar senha
routerAdmin.put(RoutesAdmin.recuperarSenhaAdmin,
    ControllerRoutesAdmin.RecuperarSenha)

// * Listar todos bilhetes
routerAdmin.get(RoutesAdmin.listarTodosBilhete,
    ControllerRoutesAdmin.ListarTodosBilhete)

// * Listar todas categorias
routerAdmin.get(RoutesAdmin.listarTodasCategoria,
    ControllerRoutesAdmin.ListarTodasCategoria
)

// * Listar todos eventos
routerAdmin.get(RoutesAdmin.listarTodosEventos,
    ControllerRoutesAdmin.ListarTodosEventos)

// * Listar todos palestrante
routerAdmin.get(RoutesAdmin.listarTodosPalestrantes,
    ControllerRoutesAdmin.ListarTodosPalestrante)


// * Listar todos oradores
routerAdmin.get(RoutesAdmin.listarTodosOradores,
    ControllerRoutesAdmin.ListarTodosOrador)

// * Listar todos palestrante com relacionamento com evento
routerAdmin.get(RoutesAdmin.listarTodosPalestrantesId,
    ControllerRoutesAdmin.ListarTodosPalestranteId)


// * Listar todos oradores com relacionamento com evento
routerAdmin.get(RoutesAdmin.listarTodosOradoresId,
    ControllerRoutesAdmin.ListarTodosOradorId)

// * Listar item bilhete da aplicacao
routerAdmin.get(RoutesAdmin.itemBilhete,
    ControllerRoutesAdmin.ListarItemBilhete)

// * Listar todos pagamentos

routerAdmin.get(RoutesAdmin.listarPagamentos,
    ControllerRoutesAdmin.ListarPagamentos
)

// * Aprovar pagamento

routerAdmin.put(RoutesAdmin.aprovarPagamento,
    ControllerRoutesAdmin.AprovarPagamento)

// * Pagamentos aprovados

routerAdmin.get(RoutesAdmin.pagamentoAprovados,
    ControllerRoutesAdmin.PagamentosAprovados
)

// * Cancelar pagamento

routerAdmin.delete(RoutesAdmin.cancelarPagamento,
    ControllerRoutesAdmin.CancelarPagamento
)

// * Listar todos usuarios
routerAdmin.get(
    RoutesAdmin.listarTodosUsuarios,
    ControllerRoutesAdmin.ListarTodosUsuarios
)


// * Estatistica

// * utilizadores

routerAdmin.get(
    RoutesAdmin.utilizadores,
    ControllerRoutesAdmin.EstatisticaUtilizador
)


// * eventos publicados
routerAdmin.get(
    RoutesAdmin.eventosPublicadosEstatistica,
    ControllerRoutesAdmin.EstatisticaEventosPublicados
)


// * categorias
routerAdmin.get(
    RoutesAdmin.categoriasEstatistica,
    ControllerRoutesAdmin.EstatisticaCategorias
)

// * Compras

routerAdmin.get(
    RoutesAdmin.comprasEstatistica,
    ControllerRoutesAdmin.EstatisticaCompra
)


routerAdmin.get(
    RoutesAdmin.pagamentoEventoFeito,
    ControllerRoutesAdmin.PagamentoEventoFeito
)


routerAdmin.get(
    RoutesAdmin.pagamentoEvento,
    ControllerRoutesAdmin.PagamentoEvento
)

routerAdmin.put(
    RoutesAdmin.eventoPago,
    ControllerRoutesAdmin.EventoPago
)





export { routerAdmin }