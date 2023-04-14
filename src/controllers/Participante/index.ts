import * as login from "./Login"
import * as create from "./CreateParticipante"

// * Perfil

import * as atualizarInformacaoBasica from "./Perfil/AtualizarInformacoes/AtualizarInformacaoBasica"
import * as atualizarPalavraPasse from "./Perfil/AtualizarPalavraPasse/AtualizarPalavraPasse"
import * as informacaoBasica from "./Perfil/InformacaoBasica"
import * as historicoCompra from "./Perfil/Compra/HistoricoCompra"
import * as detalheCompra from "./Perfil/Compra/DetalheCompra"
import * as notificacoes from "./Perfil/Notificacoes/Notificacoes"
import * as sair from "./Perfil/Sair"

// * Filtro

import * as categoriaEvento from "./Filtro/CategoriaEvento"
import * as mes from "./Filtro/Mes"

// * Meus Eventos

import * as historico from "./MeusEventos/Historico"
import * as bilheteHistorico from "./MeusEventos/BilheteHistorico"

// * Eventos

import * as visualizarEvento from "./Visualizar/VisualizarEvento"
import * as visualizarPalestrante from "./Visualizar/VisualizarPalestrante"

// * Tipo evento
import * as tipoEvento from "./TipoEvento/TipoEvento"
import * as tipoEventoDetalhe from "./TipoEvento/TipoEventoDetalhe"

// * Bilhete e Compra
import * as reserva from "./Bilhete/Reserva/Reserva"


// * Verificar conta

import * as verificarContaParticipante from "./VerificarConta/VerificarConta"

// * RecuperarSenha
import * as recuperarSenhaParticipante from "./RecuperarSenhaParticipante"

// * Listarparticipante
import * as listarparticipante from "./ListarParticipante"

// * EventosPáginaPrincipal
import * as eventosPaginaPrincipal from "./PaginaPrincipal/PaginaPrincipal"

// * EventosNovos
import * as novosEventos from "./NovosEventos/NovosEventos"

import * as eventosTodosLimiteVermais from "./TodosEventoVermais/EventosTodosLimite"
import * as eventosTodosVermais from "./TodosEventoVermais/EventosTodos"
import * as eventosNovosLimiteVermais from "./NovosEventosVermais/EventosNovosLimite"
import * as eventosNovosVermais from "./NovosEventosVermais/EventosNovos"


// * Informação evento participante
import * as informacaoEventoParticipante from "./MeusEventos/InformacaoEventoParticipante"

export const ControllerParticipante = {
    ...create,
    ...login,
    // * Perfil
    ...atualizarInformacaoBasica,
    ...atualizarPalavraPasse,
    ...informacaoBasica,
    ...historicoCompra,
    ...notificacoes,
    ...detalheCompra,
    ...sair,
    // * Filtro
    ...categoriaEvento,
    ...mes,
    // * Meus Eventos
    ...historico,
    ...bilheteHistorico,
    // * Eventos
    ...visualizarEvento,
    ...visualizarPalestrante,
    // * Tipo Evento
    ...tipoEvento,
    ...tipoEventoDetalhe,
    // * Compra
    ...reserva,
    ...verificarContaParticipante,
    // * Recuperar senha
    ...recuperarSenhaParticipante,
    // * Listar participante
    ...listarparticipante,
    // * Eventos página principal listados
    ...eventosPaginaPrincipal,
    // * Novos eventos página principal listados
    ...novosEventos,
    // * informacaoEventoParticipante
    ...informacaoEventoParticipante,

    ...eventosTodosLimiteVermais,
    ...eventosTodosVermais,
    ...eventosNovosLimiteVermais,
    ...eventosNovosVermais


}
