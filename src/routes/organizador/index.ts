import { Router } from "express";
import { RoutesOrganizador } from "../enumRoutes";
import { ControllerRoutesOrganizador } from '../../controllers/Organizador/index';
import { upload } from "../../middlewares/uploadImage";


const routerOrganizador = Router()

routerOrganizador.post(RoutesOrganizador.criarOrganizador, ControllerRoutesOrganizador.CreateOrg)

routerOrganizador.post(RoutesOrganizador.loginOganizador, ControllerRoutesOrganizador.LoginOrganizador)

// * Perfil

routerOrganizador.get(RoutesOrganizador.atualizarInformacaoBasica, ControllerRoutesOrganizador.AtualizarInformacaoBasica)
routerOrganizador.get(RoutesOrganizador.atualizarPalavraPasse, ControllerRoutesOrganizador.AtualizarPalavraPasse)
routerOrganizador.get(RoutesOrganizador.informacaoBasica, ControllerRoutesOrganizador.InformacaoBasica)
routerOrganizador.get(RoutesOrganizador.sair, ControllerRoutesOrganizador.Sair)

// * Evento


// * Criar Evento
routerOrganizador.post(
    RoutesOrganizador.criarEvento,
    ControllerRoutesOrganizador.CriarEvento)

// * Publicar Evento
routerOrganizador.get(
    RoutesOrganizador.publicarEvento,
    ControllerRoutesOrganizador.PublicarEvento
)

// * Listar Evento
routerOrganizador.get(
    RoutesOrganizador.listarEvento,
    ControllerRoutesOrganizador.ListarEventos)

// *Adicionar Foto
routerOrganizador.get(
    RoutesOrganizador.adicionarFotoEvento,
    upload.single("foto"),
    ControllerRoutesOrganizador.AdicionarFotoEvento)

// * Editar Evento
routerOrganizador.get(
    RoutesOrganizador.editarEvento,
    ControllerRoutesOrganizador.EditarEvento)

// * Palestrante


// * Adicionar foto palestrante
routerOrganizador.get(
    RoutesOrganizador.adicionarFotoPalestrante,
    upload.single("foto"),
    ControllerRoutesOrganizador.AdicionarFotoPalestrante)

// * Criar palestrante
routerOrganizador.post(
    RoutesOrganizador.criarPalestrante,
    ControllerRoutesOrganizador.CriarPalestrante)

// * Apagar palestrante
routerOrganizador.delete(
    RoutesOrganizador.apagarPalestrante,
    ControllerRoutesOrganizador.ApagarPalestrante)

// * Atualizar palestrante
routerOrganizador.get(
    RoutesOrganizador.atualizarPalestrante,
    ControllerRoutesOrganizador.AtualizarPalestrante)

// * Listar palestrante
routerOrganizador.get(
    RoutesOrganizador.listaPalestrante, ControllerRoutesOrganizador.ListarPalestrante)


// * Orador

// * Criar orador
routerOrganizador.post(
    RoutesOrganizador.criarOrador,
    ControllerRoutesOrganizador.CriarOrador)

// * Apagar orador
routerOrganizador.delete(
    RoutesOrganizador.apagarOrador,
    ControllerRoutesOrganizador.ApagarOrador)

// * Atualizar orador
routerOrganizador.get(
    RoutesOrganizador.atualizarOrador,
    ControllerRoutesOrganizador.AtualizarOrador)

// * Listar orador
routerOrganizador.get(
    RoutesOrganizador.listaOrador, ControllerRoutesOrganizador.ListarOrador)


// * Bilhete

// * Criar bilhete
routerOrganizador.post(
    RoutesOrganizador.criarBilhete,
    ControllerRoutesOrganizador.CriarBilhete)

// * Apagar bilhete
routerOrganizador.delete(
    RoutesOrganizador.apagarBilhete,
    ControllerRoutesOrganizador.ApagarBilhete)

// * Atualizar bilhete
routerOrganizador.get(
    RoutesOrganizador.atualizarBilhete,
    ControllerRoutesOrganizador.AtualizarBilhete)

// * Listar bilhete
routerOrganizador.get(
    RoutesOrganizador.listaBilhete,
    ControllerRoutesOrganizador.ListarBilhete)




export { routerOrganizador }