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

import * as eventosTodos from "./TodosEventoVermais/EventosTodos"
import * as eventosTopMes from "./EventosTopMesVermais/EventosTopMes"
import * as eventosNovos from "./NovosEventosVermais/EventosNovos"

// * Tipo evento
import * as tipoEvento from "./TipoEvento/TipoEvento"
import * as tipoEventoDetalhe from "./TipoEvento/TipoEventoDetalhe"

// * Bilhete e Compra
import * as bilhete from "./TipoEvento/Bilhete/Bilhete"
import * as compra  from "./TipoEvento/Bilhete/Compra/Compra"


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
    ...eventosTodos,
    ...eventosTopMes,
    ...eventosNovos,
    // * Tipo Evento
    ...tipoEvento,
    ...tipoEventoDetalhe,
    // * Bilhete e Compra
    ...bilhete,
    ...compra
}
