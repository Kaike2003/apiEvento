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

// * Listar teatro
import * as teatro from "./TipoEvento/Teatro/Teatro"
import * as teatroLimite from "./TipoEvento/Teatro/TeatroLimite"

// * Listar Concerto
import * as concerto from "./TipoEvento/Concerto/Concerto"
import * as concertoLimite from "./TipoEvento/Concerto/ConcertoLimite"

// * Listar Shows
import * as shows from "./TipoEvento/Shows/Shows"
import * as showsLimite from "./TipoEvento/Shows/ShowsLimite"

// * Listar Palestra
import * as palestra from "./TipoEvento/Palestra/Palestra"
import * as palestraLimite from "./TipoEvento/Palestra/PalestraLimite"

// * Listar Seminário
import * as seminario from "./TipoEvento/Seminario/Seminario"
import * as seminarioLimite from "./TipoEvento/Seminario/SeminarioLimite"

// * Adicionar comprovativo

import * as adicionarComprovativo from "./MeusEventos/AdicionarComprovativo"

// * Historico pago

import * as historicoPago from "./MeusEventos/HistoricoPago"

// * Historico nao pago

import * as historicoNaoPago from "./MeusEventos/HistoricoNaoPago"


// * Adicionar foto participante 

import * as adicionarFotoParticipante from "./AdicionarFotoParticipante"





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
    ...eventosNovosVermais,

    // * Listar teatro
    ...teatro,

    // * Listar teatro limite 
    ...teatroLimite,

    // * Listar concerto
    ...concerto,

    // * Listar concerto limite 
    ...concertoLimite,

    // * Listar Shows
    ...shows,

    // * Listar Shows limite
    ...showsLimite,

    // * Listar Palestra
    ...palestra,

    // * Listar Palestra limite
    ...palestraLimite,

    // * Listar Seminario
    ...seminario,

    // * Listar S   eminario limite
    ...seminarioLimite,

    // * Adicionar foto do comprovativo
    ...adicionarComprovativo,

    // * Historico Pago
    ...historicoPago,

    // * Historico Nao Pago

    ...historicoNaoPago,

    ...adicionarFotoParticipante







}
