import * as loginOrg from "./Login"
import * as createOrg from "./CriarOrganizador"

// * Perfil
import * as informacaoBasica from "./Perfil/InformacaoBasica"
import * as atualizarPalavraPasse from "./Perfil/AtualizarPalavraPasse/AtualizarPalavraPasse"
import * as AtualizarInformacoes from "./Perfil/AtualizarInformacoes/AtualizarInformacaoBasica"
import * as sair from "./Perfil/Sair"

// * Eventos 
import * as criarEvento from "./Eventos/CriarEventos/CriarEvento"
import * as atualizarEvento from "./Eventos/CriarEventos/AtualizarEvento/AtualizarEvento"
import * as criarBilhete from "./Eventos/CriarEventos/Bilhete/CriarBilhete"
import * as atualizarBilhete from "./Eventos/CriarEventos/Bilhete/AtualizarBilhete/AtualizarBilhete"
import * as historicoEvento from "./Eventos/Historico/HistoricoEvento"

// * Palestrante
import * as criarPalestrante from "./Eventos/CriarEventos/CriarPalestrante/CriarPalestrante"
import * as listarPalestrante from "./Eventos/CriarEventos/CriarPalestrante/ListarPalestrante"
import * as apagarPalestrante from "./Eventos/CriarEventos/CriarPalestrante/ApagarPalestrante"
import * as atualizarPalestrante from "./Eventos/CriarEventos/CriarPalestrante/AtualizarPalestrante"


// * Orador
import * as criarOrador from "./Eventos/CriarEventos/CriarOrador/CriarOrador"
import * as listarOrador from "./Eventos/CriarEventos/CriarOrador/ListarOrador"
import * as apagarOrador from "./Eventos/CriarEventos/CriarOrador/ApagarOrador"
import * as atualizarOrador from "./Eventos/CriarEventos/CriarOrador/AtualizarOrador"



export const ControllerRoutesOrganizador = {
    ...loginOrg,
    ...createOrg,

    // * Perfil
    ...informacaoBasica,
    ...atualizarPalavraPasse,
    ...AtualizarInformacoes,
    ...sair,

    // * Eventos
    ...criarEvento,
    ...criarBilhete,
    ...atualizarBilhete,
    ...atualizarEvento,
    ...historicoEvento,

    // * Palestrante
    ...criarPalestrante,
    ...apagarPalestrante,
    ...listarPalestrante,
    ...atualizarPalestrante,

    // * Orador
    ...criarOrador,
    ...listarOrador,
    ...apagarOrador,
    ...atualizarOrador


}