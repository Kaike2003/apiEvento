export const enum RoutesAdmin {
    loginAdmin = "/loginAdmin",
    post = "/create",
    listaAdministradores = "/administradores/listaAdministradores",
    eventosPublicados = "/eventos/eventosPublicados",
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
    loginOganizador = "/loginOrganizador",

    //* Perfil

    informacaoBasica = "/perfil/informacao/",
    atualizarPalavraPasse = "/perfil/atualizarPalavraPasse",
    atualizarInformacaoBasica = "/perfil/atualizarInformacaoBasica",
    sair = "/perfil/sair",

    // * Evento

    // * Criar evento
    criarEvento = "/evento/criarEvento",


    // * Publicar evento
    publicarEvento = "/evento/publicar/:id",

    atualizarEvento = "/evento/atualizarEvento",

    // * Historico evento
    historicoEvento = "/evento/historico",

    // * Listar evento
    listarEvento = "/evento/lista",

    // * Editar evento
    editarEvento = "/evento/detalhe/editar/:id",

    // * Adicionar foto evento
    adicionarFotoEvento = "/evento/detalhe/editar/:id/foto",


    // * Palestrante

    // * Adicionar foto palestrante
    adicionarFotoPalestrante = "/evento/detalhe/editar/:id/palestrante/:idPalestrante/foto"
    ,
    // * Criar Palestrante
    criarPalestrante = "/evento/detalhe/editar/:id/palestrante",
    // * Apagar Palestrante
    apagarPalestrante = "/evento/detalhe/editar/:id/palestrante/:idPalestrante",
    // * Atualizar Palestrante
    atualizarPalestrante = "/evento/detalhe/editar/:id/palestrante/:idPalestrante"
    // * Listar Palestrante
    , listaPalestrante = "/evento/detalhe/editar/:id/palestrante"

    // * Orador

    // * Criar Orador
    , criarOrador = "/evento/detalhe/editar/:id/orador",
    // * Apagar Orador
    apagarOrador = "/evento/detalhe/editar/:id/orador/:idOrador",
    // * Atualizar Orador
    atualizarOrador = "/evento/detalhe/editar/:id/orador/:idOrador"
    // * Listar Orador
    , listaOrador = "/evento/detalhe/editar/:id/orador"


    // * Bilhete

    // * Criar bilhete
    , criarBilhete = "/evento/detalhe/editar/:id/bilhete",
    // * Apagar bilhete
    apagarBilhete = "/evento/detalhe/editar/:id/bilhete/:idBilhete",
    // * Atualizar bilhete
    atualizarBilhete = "/evento/detalhe/editar/:id/bilhete/:idBilhete"
    // * Listar Orador
    , listaBilhete = "/evento/detalhe/editar/:id/bilhete"





}