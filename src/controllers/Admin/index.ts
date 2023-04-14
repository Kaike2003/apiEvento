import * as login from "./Login"
import * as criar from "./CriarAdmin"
import * as listaAdministradores from "./Administradores/ListaAdministradores"
import * as eventosPublicados from "./Eventos/EventosPublicados"
import * as participante from "./Usuarios/Participante"
import * as organizador from "./Usuarios/Organizador"
import * as informacaoBasica from "./Perfil/InformacaoBasica"
import * as atualizarPalavraPasse from "./Perfil/AtualizarPalavraPasse"
import * as atualizarInformacaoBasica from "./Perfil/AtualizarInformacaoBasica"
import * as sair from "./Perfil/Sair"

// * Banir evento
import * as banirEvento from "./Eventos/BanirEventos"

// * Categoria
import * as criarCategoria from "./Categoria/CriarCategoria"
import * as listarCategoria from "./Categoria/ListarCategoria"
import * as apagarCategoria from "./Categoria/ApagarCategoria"
import * as atualizarCategoria from "./Categoria/AtualizarCategoria"

// * TipoEvento
import * as criarTipoBilhete from "./TipoBilhete/CriarTipoBilhete"
import * as listarTipoBilhete from "./TipoBilhete/ListarTipoBilhete"
import * as apagarTipoBilhete from "./TipoBilhete/ApagarTipoBilhete"
import * as atualizarTipoBilhete from "./TipoBilhete/AtualizarTipoBilhete"

import * as verificarConta from "./verificarConta/VerificarConta"

// * Aprovar evento
import * as aprovarEvento from "./Eventos/AprovarEvento"
import * as eventosAespera from "./Eventos/EventosAespera"

// * Recuperar senha
import * as recuperarsenhaAdmin from "./RecuperarSenhaAdmin"

// * Eventos banidos
import * as eventosbanidos from "./Eventos/EventosBanidos"

// * Listar todos os bilhetes
import * as listarTodosBilhete from "./Eventos/Bilhete/ListarTodosBilhete"

// * Listar todas as categorias

import * as listarTodasCategorias from "./Eventos/Categoria/ListarTodasCategoria"

// * Listar todos eventos

import * as listarTodosEventos from "./Eventos/ListarTodosEventos"

// * Listar todos oradores

import * as listarTodosOradores from "./Eventos/Orador/ListarTodosOrador"

// * Listar todos palestrante

import * as listarTodosPalestrantes from "./Eventos/Palestrante/ListarTodosPalestrante"

// * Listar todos oradores com relacionamento com evento

import * as listarTodosOradoresId from "./Eventos/Orador/ListarTodosOradorId"

// * Listar todos palestrante com relacionamento com evento

import * as listarTodosPalestrantesId from "./Eventos/Palestrante/ListarTodosPalestranteId"




export const ControllerRoutesAdmin = {
    ...login,
    ...criar,
    ...listaAdministradores,

    // * Eventos publicados
    ...eventosPublicados,

    //* Eventos banidos
    ...banirEvento,

    // * Aprovar evento
    ...aprovarEvento,

    // * Aprovar a espera
    ...eventosAespera,

    ...organizador,
    ...participante,
    ...informacaoBasica,
    ...atualizarPalavraPasse,
    ...atualizarInformacaoBasica,
    ...sair,

    // *  Categoria
    ...criarCategoria,
    ...listarCategoria,
    ...apagarCategoria,
    ...atualizarCategoria,

    // * Tipo Bilhete
    ...criarTipoBilhete,
    ...listarTipoBilhete,
    ...apagarTipoBilhete,
    ...atualizarTipoBilhete,

    // * Eventos banidos
    ...eventosbanidos,

    // * Listar todos os bilhetes
    ...listarTodosBilhete,

    // * Listar todas as categorias
    ...listarTodasCategorias,

    // * Listar todos eventos
    ...listarTodosEventos,

    // * Listar todos palestrantes
    ...listarTodosPalestrantes,

    // * Listar todos oradores
    ...listarTodosOradores,

    // * Listar todos oradores com relacionamento com evento
    ...listarTodosOradoresId,

    // * Listar todos palestrantes com relacionamento com evento
    ...listarTodosPalestrantesId,

    ...verificarConta,
    ...recuperarsenhaAdmin

}