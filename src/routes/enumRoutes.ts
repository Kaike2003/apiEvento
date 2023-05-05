export const enum RoutesAdmin {
    loginAdmin = "/loginAdmin",
    post = "/create",
    verificarContaAdmin = "/verificarAdmin/:idUtilizador",

    listarTodosBilhete = "/listarTodosBilhetes",
    listarTodasCategoria = "/listarTodasCategorias",
    listarTodosEventos = "/listarTodosEventos",
    listarTodosOradores = "/listarTodosOradores",
    listarTodosPalestrantes = "/listarTodosPalestrantes",
    listarTodosOradoresId = "/listarTodosOradoresId",
    listarTodosPalestrantesId = "/listarTodosPalestrantesId",

    contacto = "/contacto",

    // * Listar todas compras
    listarTodasCompras = "/listarTodasCompras",


    // * Pagamento Evento feito
    pagamentoEventoFeito = "/pagamentoEventoFeito",

    // * Pagamento evento 
    pagamentoEvento = "/pagamentoEvento",


    // * Evento Pago
    eventoPago = "/eventoPago/:idEvento",


    // * Listar item Bilhete
    itemBilhete = "/itemBilhete",

    // * Listar aprovarPagamento
    listarPagamentos = "/listarPagamentos",

    // * Aprovar pagamento

    aprovarPagamento = "/aprovarPagamento/:idCompra/:idUtilizador",

    // * Pagamentos aprovados

    pagamentoAprovados = "/pagamentoAprovados",

    // * Cancelar pagamento ,
    cancelarPagamento = "/cancelarPagamento/:idCompra/:idUtilizador",

    // * utilizadores 
    utilizadores = "/utilizadores",

    // * eventos publicados estatisticas

    eventosPublicadosEstatistica = "/eventosPublicadosEstatistica",

    // * eventos publicados estatisticas
    categoriasEstatistica = "/categoriasEstatistica",

    // * compras estatisticas

    comprasEstatistica = "/comprasEstatistica",


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


    // * Eventos banidos
    eventosBanidos = "/eventos/banidos",


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
    recuperarSenhaAdmin = "/recuperarSenha",

    // * Listar todos usuarios
    listarTodosUsuarios = "/listarTodosUsuarios"





}


export const enum RoutesParticipante {
    createParticipante = "/create",
    loginParticipante = "/loginParticipante",
    // verificarContaPalestrante = "/verificarContaPalestrante/:idUtilizador",

    verificarContaParticipante = "/verificarContaParticipante",

    eventosPaginaPrincipal = "/paginaPrincipal",
    novosEventos = "/novosEventosPaginaPrincipal",

    // * Adicionar foto do comprovativo
    adicionarComprovaito = "/adicionarComprovaito/:idCompra/:idUtilizador",

    // * Historico pago
    historicoPago = "/meusEventos/historicoPago/:idUtilizador",

    // * Historico pago
    historicoNaoPago = "/meusEventos/historicoNaoPago/:idUtilizador",


    // * Perfil

    adicionarFotoParticipante = "/perfil/:idUtilizador/adicionarFotoParticipante",
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

    historico = "/meusEventos/historico/:idUtilizador",
    bilhetehistorico = "/meusEventos/historico/bilhete/:idUtilizador",
    informacaoEventoParticipante = "/meusEventos/historico/:idUtilizador/:idBilhete/evento",

    // * Eventos
    eventosTodosLimite = "/todosEventos?limite",
    eventosTodos = "/todosEventos",
    eventosNovosLimite = "/novosEventos?limite",
    eventosNovos = "/novosEventos",

    // * Visualizar
    visualizarEvento = "/eventos/visualizarEvento/:idEvento",
    visualiarPalestrante = "/eventos/visualizarPalestrante/:idEvento",


    // * Tipo Evento
    tipoEvento = "/tipoEvento",
    tipoEventoDetalhe = "/tipoEvento/detalhe",

    // * Reserva
    reserva = "/eventos/visualizarEvento/:idEvento/reserva/:idUtilizador",

    // * Recuperar senha participante
    recuperarSenhaParticipante = "/recuperarSenha",

    // * Listar participante
    listarparticipante = "/listarParticipante",


    // * Listar teatro
    listarTeatro = "/teatroEventos",
    listarTeatroLimite = "/teatroEventos?limite",

    // * Listar Concerto
    listarConcerto = "/concertoEventos",
    listarConcertoLimite = "/concertoEventos?limite",

    // * Listar Seminario
    listarSeminario = "/seminarioEventos",
    listarSeminariotoLimite = "/seminarioEventos?limite",

    // * Listar palestra
    listarPalestra = "/palestraEventos",
    listarPalestraLimite = "/palestraEventos?limite",

    // * Listar shows
    listarShows = "/showsEventos",
    listarShowsLimite = "/showsEventos?limite"



}


export const enum RoutesOrganizador {
    criarOrganizador = "/create",
    loginOganizador = "/loginOrganizador",
    // verificarContaOrganizador = "/verificarOrganizador/:idUtilizador",


    verificarContaOrganizador = "/verificarContaOrganizador",


    //* Perfil
    adicionarFotoOrganizador = "/perfil/:idUtilizador/adicionarFotoOrganizador",
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

    // * Editar evento
    apagarEvento = "/evento/detalhe/apagarEvento/:idUtilizador/:idEvento",

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
    // * Listar bilhete
    , listaBilhete = "/evento/detalhe/editar/:idEvento/bilhete",



    // * Recuperar senha Organizador
    recuperarSenhaOrganizador = "/recuperarSenha"



}

