export const enum RoutesAdmin {
    loginAdmin = "/loginAdmin",
    post = "/create",
    listaAdministradores = "/administradores/listaAdministradores",
    eventosMarcados = "/eventos/eventosMarcados",
    participante = "/usuarios/participante",
    organizador = "/usuarios/organizador",
    informacaoBasica = "/perfil/informacao/",
    atualizarPalavraPasse = "/perfil/atualizarPalavraPasse",
    atualizarInformacaoBasica = "/perfil/atualizarInformacaoBasica",
    sair = "/perfil/sair",

    // * Categoria
    criarCategoria = "/categoria",
    listarCategoria = "/categoria/todasCategoria",
    apagarCategoria = "/categoria/apagarCategoria/:id",
    atualizarCategoria = "/categoria/atualizarCategoria/:id",

    // * TipoBilhete
    criarTipoBilhete = "/tipoBilhete",
    listarTipoBilhete = "/tipoBilhete/todosTipobilhete",
    apagarTipoBilhete = "/tipoBilhete/apagarTipoBilhete/:id",
    atualizarTipoBilhete = "/tipoBilhete/atualizarTipobilhete/:id"




}


export const enum RoutesParticipante {
    createParticipante = "/create",
    loginParticipante = "/loginParticipante",

    // * Perfil

    informacaoBasica = "/perfil/informacao/",
    atualizarPalavraPasse = "/perfil/atualizarPalavraPasse",
    atualizarInformacaoBasica = "/perfil/atualizarInformacaoBasica",
    historicoCompra = "/perfil/compra/historicoCompra/",
    detalhaCompra = "/perfil/compra/detalheCompra",
    notificacoes = "/perfil/notificacoes/",
    sair = "/perfil/sair",

    // * Filtro

    categoriaEvento = "/filtro/categoriaEvento",
    mes = "/filtro/mes",

    // * Meus eventos

    historico = "/meusEventos/historico",
    bilhetehistorico = "/meusEventos/historico/bilhete",

    // * Eventos
    eventosTodos = "/todosEventos",
    eventosTopMes = "/eventosTopMes",
    eventosNovos = "/novosEventos",

    // * Tipo Evento
    tipoEvento = "/tipoEvento",
    tipoEventoDetalhe = "/tipoEvento/detalhe",

    // * Bilhete e compra
    bilhete = "/tipoEvento/detalhete/bilhete",
    compra = "/tipoEvento/detalhete/bilhete/compra",



}


export const enum RoutesOrganizador {
    criarOrganizador = "/create",

    //* Perfil

    informacaoBasica = "/perfil/informacao/",
    atualizarPalavraPasse = "/perfil/atualizarPalavraPasse",
    atualizarInformacaoBasica = "/perfil/atualizarInformacaoBasica",
    sair = "/perfil/sair",

    //* Evento
    criarEvento = "/evento/criarEvento",
    atualizarEvento = "/evento/atualizarEvento",
    criarBilhete = "/evento/criarBilhete",
    atualizarBilhete = "/evento/atualizarBilhete",
    historicoEvento = "/evento/historico",

    // * Palestrante
    criarPalestrante = "/evento/palestrante",
    atualizarPalestrante = "/evento/palestrante/atualizarPalestrante/:id",
    apagarPalestrante = "/evento/palestrante/apagarPalestrante/:id",
    listarPalestrante = "/evento/palestrante/todosPalestrante",

    // * Orador
    criarOrador = "/evento/orador",
    atualizarOrador = "/evento/orador/atualizarOrador/:id",
    apagarOrador = "/evento/orador/apagarOrador/:id",
    listarOrador = "/evento/orador/todosOrador",


}