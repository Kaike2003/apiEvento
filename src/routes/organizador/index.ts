import { Router } from "express";
import { RoutesOrganizador } from "../enumRoutes";
import { ControllerRoutesOrganizador } from '../../controllers/Organizador/index';
import { upload } from "../../middlewares/uploadImage";


const routerOrganizador = Router()

routerOrganizador.post(RoutesOrganizador.criarOrganizador, ControllerRoutesOrganizador.CreateOrg)

// * Perfil

routerOrganizador.get(RoutesOrganizador.atualizarInformacaoBasica, ControllerRoutesOrganizador.AtualizarInformacaoBasica)
routerOrganizador.get(RoutesOrganizador.atualizarPalavraPasse, ControllerRoutesOrganizador.AtualizarPalavraPasse)
routerOrganizador.get(RoutesOrganizador.informacaoBasica, ControllerRoutesOrganizador.InformacaoBasica)
routerOrganizador.get(RoutesOrganizador.sair, ControllerRoutesOrganizador.Sair)

// * Evento


routerOrganizador.post(
    RoutesOrganizador.criarEvento,
    upload.single("foto"),
    ControllerRoutesOrganizador.CriarEvento)
routerOrganizador.get(RoutesOrganizador.atualizarEvento, ControllerRoutesOrganizador.AtualizarEvento)
routerOrganizador.post(RoutesOrganizador.criarBilhete, ControllerRoutesOrganizador.CriarBilhete)
routerOrganizador.get(RoutesOrganizador.atualizarBilhete, ControllerRoutesOrganizador.AtualizarBilhete)
routerOrganizador.get(RoutesOrganizador.historicoEvento, ControllerRoutesOrganizador.HistoricoEvento)

// * Palestrante

routerOrganizador.post(RoutesOrganizador.criarPalestrante,
    upload.single("foto"), ControllerRoutesOrganizador.CriarPalestrante)
routerOrganizador.get(RoutesOrganizador.listarPalestrante, ControllerRoutesOrganizador.ListarPalestrante)
routerOrganizador.delete(RoutesOrganizador.apagarPalestrante, ControllerRoutesOrganizador.ApagarPalestrante)
routerOrganizador.get(RoutesOrganizador.atualizarPalestrante, ControllerRoutesOrganizador.AtualizarPalestrante)

// * Orador

routerOrganizador.post(RoutesOrganizador.criarOrador, ControllerRoutesOrganizador.CriarOrador)
routerOrganizador.get(RoutesOrganizador.listarOrador, ControllerRoutesOrganizador.ListarOradores)
routerOrganizador.delete(RoutesOrganizador.apagarOrador, ControllerRoutesOrganizador.ApagarOrador)
routerOrganizador.get(RoutesOrganizador.atualizarOrador, ControllerRoutesOrganizador.AtualizarOrador)




export { routerOrganizador }