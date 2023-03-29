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

// * Aprovar evento
import * as aprovarEvento from "./Eventos/AprovarEvento"
import * as eventosAespera from "./Eventos/EventosAespera"


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
    ...atualizarTipoBilhete

}