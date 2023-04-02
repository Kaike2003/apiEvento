export const enum RoutesAdmin {
    loginAdmin = "/loginAdmin",
    post = "/create",
    verificarContaAdmin = "/verificarAdmin/:idUtilizador",


    listaAdministradores = "/administradores/listaAdministradores",
    eventosPublicados = "/eventos/publicados",
    participante = "/usuarios/participante",
    organizador = "/usuarios/organizador",
    informacaoBasica = "/perfil/:idUtilizador/informacao",
    atualizarPalavraPasse = "/perfil/:idUtilizador/atualizarPalavraPasse",
    atualizarInformacaoBasica = "/perfil/:idUtilizador/atualizarInformacaoBasica",
    sair = "/perfil/sair",

    // * Banir evento
    banirEvento = "/eventos/banido/:idEvento",

    // * Aprovar evento
    aprovarEvento = "/eventos/aprovarEventos/:idEvento",

    // * Eventos a espera
    eventosAespera = "/eventos/eventosEspera",

    // * Categoria
    criarCategoria = "/categoria",
    listarCategoria = "/categoria/todasCategoria",
    apagarCategoria = "/categoria/apagarCategoria/:id",
    atualizarCategoria = "/categoria/atualizarCategoria/:id",

    // * TipoBilhete
    criarTipoBilhete = "/tipoBilhete",
    listarTipoBilhete = "/tipoBilhete/todosTipobilhete",
    apagarTipoBilhete = "/tipoBilhete/apagarTipoBilhete/:id",
    atualizarTipoBilhete = "/tipoBilhete/atualizarTipobilhete/:id",

    
    // * Recuperar senha Organizador
    recuperarSenhaAdmin = "/recuperarSenha"





}


export const enum RoutesParticipante {
    createParticipante = "/create",
    loginParticipante = "/loginParticipante",
    verificarContaPalestrante = "/verificarContaPalestrante/:idUtilizador",


    // * Perfil

    informacaoBasica = "/perfil/:idUtilizador/informacao",
    atualizarPalavraPasse = "/perfil/:idUtilizador/atualizarPalavraPasse",
    atualizarInformacaoBasica = "/perfil/:idUtilizador/atualizarInformacaoBasica",
    historicoCompra = "/perfil/compra/historicoCompra/",
    detalhaCompra = "/perfil/compra/detalheCompra",
    notificacoes = "/perfil/notificacoes/",
    sair = "/perfil/sair",

    // * Filtro

    categoriaEvento = "/filtro/categoriaEvento/:idCategoria",
    mes = "/filtro/mes/:numeroData",

    // * Meus eventos

    historico = "/meusEventos/historico",
    bilhetehistorico = "/meusEventos/historico/bilhete",

    // * Eventos
    eventosTodos = "/todosEventos",

    // * Visualizar
    visualizarEvento = "/eventos/visualizarEvento/:idEvento",
    visualiarPalestrante = "/eventos/visualizarPalestrante/:idEvento",
    eventosNovos = "/novosEventos",


    // * Tipo Evento
    tipoEvento = "/tipoEvento",
    tipoEventoDetalhe = "/tipoEvento/detalhe",

    // * Compra
    compra = "/eventos/visualizarEvento/:idEvento/compra/:idUtilizador",

    // * Recuperar senha participante
    recuperarSenhaParticipante = "/recuperarSenha"



}


export const enum RoutesOrganizador {
    criarOrganizador = "/create",
    loginOganizador = "/loginOrganizador",
    verificarContaOrganizador = "/verificarOrganizador/:idUtilizador",

    //* Perfil

    informacaoBasica = "/perfil/:idUtilizador/informacao",
    atualizarPalavraPasse = "/perfil/:idUtilizador/atualizarPalavraPasse",
    atualizarInformacaoBasica = "/perfil/:idUtilizador/atualizarInformacaoBasica",
    sair = "/perfil/sair",

    // * Evento

    // * Criar evento
    criarEvento = "/evento/criarEvento/:idUtilizador",


    // * Publicar evento
    publicarEvento = "/evento/publicar/:idUtilizador/:idEvento",

    atualizarEvento = "/evento/atualizarEvento",

    // * Historico evento
    historicoEvento = "/evento/historico/:idUtilizador",

    // * Listar evento
    listarEvento = "/evento/lista/:idUtilizador",

    // * Editar evento
    editarEvento = "/evento/detalhe/editarEvento/:idUtilizador/:idEvento",

    // * Adicionar foto evento
    adicionarFotoEvento = "/evento/detalhe/editar/:idUtilizador/foto/:idEvento",


    // * Palestrante

    // * Adicionar foto palestrante
    adicionarFotoPalestrante = "/evento/detalhe/editar/:idEvento/palestrante/:idPalestrante/foto"
    ,
    // * Criar Palestrante
    criarPalestrante = "/evento/detalhe/editar/:idEvento/palestrante",
    // * Apagar Palestrante
    apagarPalestrante = "/evento/detalhe/editar/:idEvento/palestrante/:idPalestrante",
    // * Atualizar Palestrante
    atualizarPalestrante = "/evento/detalhe/editar/:idEvento/palestrante/:idPalestrante"
    // * Listar Palestrante
    , listaPalestrante = "/evento/detalhe/editar/:idEvento/palestrante"

    // * Orador

    // * Criar Orador
    , criarOrador = "/evento/detalhe/editar/:idEvento/orador",
    // * Apagar Orador
    apagarOrador = "/evento/detalhe/editar/:idEvento/orador/:idOrador",
    // * Atualizar Orador
    atualizarOrador = "/evento/detalhe/editar/:idEvento/orador/:idOrador"
    // * Listar Orador
    , listaOrador = "/evento/detalhe/editar/:idEvento/orador"


    // * Bilhete

    // * Criar bilhete
    , criarBilhete = "/evento/detalhe/editar/:idEvento/bilhete",
    // * Apagar bilhete
    apagarBilhete = "/evento/detalhe/editar/:idEvento/bilhete/:idBilhete",
    // * Atualizar bilhete
    atualizarBilhete = "/evento/detalhe/editar/:idEvento/bilhete/:idBilhete"
    // * Listar Orador
    , listaBilhete = "/evento/detalhe/editar/:idEvento/bilhete",



    // * Recuperar senha Organizador
    recuperarSenhaOrganizador = "/recuperarSenha"



}

