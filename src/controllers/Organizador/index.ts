import * as loginOrg from "./Login"
import * as createOrg from "./CriarOrganizador"

// * Perfil
import * as informacaoBasica from "./Perfil/InformacaoBasica"
import * as atualizarPalavraPasse from "./Perfil/AtualizarPalavraPasse/AtualizarPalavraPasse"
import * as AtualizarInformacoes from "./Perfil/AtualizarInformacoes/AtualizarInformacaoBasica"
import * as sair from "./Perfil/Sair"

// * Evento

// * Criar Evento
import * as criarEvento from "./Eventos/CriarEventos/CriarEvento"

// *Publicar Evento
import * as publicarEvento from "./Eventos/CriarEventos/PublicarEvento"

import * as historicoEvento from "./Eventos/Historico/HistoricoEvento"

// * Adicionar foto do evento
import * as adicionarFotoEvento from "./Eventos/CriarEventos/AdicionarFotoEvento"

//* Listar Evento
import * as listarEvento from "./Eventos/CriarEventos/ListarEventos"

// * Editar Evento
import * as editarEvento from "./Eventos/CriarEventos/EditarEvento"


// * Palestrante

// * Adicionar foto
import * as adicionarFotoPalestrante from "./Eventos/CriarEventos/Palestrante/AdicionarFotoPalestrante"

// * Criar Palestrante
import * as criarPalestrante from "./Eventos/CriarEventos/Palestrante/CriarPalestrante"

// * Apagar Palestrante
import * as apagarPalestrante from "./Eventos/CriarEventos/Palestrante/ApagarPalestrante"

// * Atualizar Palestrante
import * as atualizarPalestrante from "./Eventos/CriarEventos/Palestrante/AtualizarPalestrante"

// * Listar Palestrante
import * as listarPalestrante from "./Eventos/CriarEventos/Palestrante/ListarPalestrante"

// * Orador
import * as criarOrador from "./Eventos/CriarEventos/Orador/CriarOrador"
import * as listarOrador from "./Eventos/CriarEventos/Orador/ListarOrador"
import * as apagarOrador from "./Eventos/CriarEventos/Orador/ApagarOrador"
import * as atualizarOrador from "./Eventos/CriarEventos/Orador/AtualizarOrador"


// * Bilhete
import * as criarBilhete from "./Eventos/CriarEventos/Bilhete/CriarBilhete"
import * as listarBilhete from "./Eventos/CriarEventos/Bilhete/ListarBilhete"
import * as apagarBilhete from "./Eventos/CriarEventos/Bilhete/ApagarBilhete"
import * as atualizarBilhete from "./Eventos/CriarEventos/Bilhete/AtualizarBilhete"




export const ControllerRoutesOrganizador = {
    ...loginOrg,
    ...createOrg,

    // * Perfil
    ...informacaoBasica,
    ...atualizarPalavraPasse,
    ...AtualizarInformacoes,
    ...sair,

    // * Eventos

    // * Criar evento
    ...criarEvento,

    // * Adicionar foto do evento
    ...adicionarFotoEvento,

    // * Publicar evento
    ...publicarEvento,

    // * Historico do evento
    ...historicoEvento,

    // * Listar evento
    ...listarEvento,

    // * Editar evento,
    ...editarEvento,

    // * Adicionar foto palestrante 
    ...adicionarFotoPalestrante,
    // * Criar palestrante
    ...criarPalestrante,
    // * Apagar palestrante
    ...apagarPalestrante,
    // * Atualizar palestrante
    ...atualizarPalestrante,
    // * Listar Palestrante
    ...listarPalestrante,

    // * Criar orador
    ...criarOrador,
    // * Apagar orador
    ...apagarOrador,
    // * Atualizar orador
    ...atualizarOrador,
    // * Listar orador
    ...listarOrador,

    // * Criar bilhete
    ...criarBilhete,
    // * Apagar bilhete
    ...apagarBilhete,
    // * Atualizar bilhete
    ...atualizarBilhete,
    // * Listar bilhete
    ...listarBilhete,

}