import { Router } from "express";
import { ControllerRoutesAdmin } from "../../controllers";

import { RoutesAdmin } from "../enumRoutes";


const routerAdmin = Router()


routerAdmin.post(RoutesAdmin.loginAdmin, ControllerRoutesAdmin.Login)
routerAdmin.post(RoutesAdmin.post, ControllerRoutesAdmin.Create)
routerAdmin.get(RoutesAdmin.listaAdministradores, ControllerRoutesAdmin.ListaAdministradores)

routerAdmin.get(RoutesAdmin.participante, ControllerRoutesAdmin.Participante)
routerAdmin.get(RoutesAdmin.organizador, ControllerRoutesAdmin.Organizador)
routerAdmin.get(RoutesAdmin.informacaoBasica, ControllerRoutesAdmin.InformacaoBasica)
routerAdmin.get(RoutesAdmin.atualizarPalavraPasse, ControllerRoutesAdmin.AtualizarPalavraPasse)
routerAdmin.get(RoutesAdmin.atualizarInformacaoBasica, ControllerRoutesAdmin.AtualizarInformacaoBasica)
routerAdmin.get(RoutesAdmin.sair, ControllerRoutesAdmin.Sair)

// * Eventos publicados
routerAdmin.get(RoutesAdmin.eventosPublicados, ControllerRoutesAdmin.EventosPublicados)

// * Banir evento
routerAdmin.put(
    RoutesAdmin.banirEvento,
    ControllerRoutesAdmin.BanirEventos)

// * Aprovar evento
routerAdmin.put(
    RoutesAdmin.aprovarEvento,
    ControllerRoutesAdmin.AprovarEvento
)

// * Eventos a espera
routerAdmin.get(
    RoutesAdmin.eventosAespera,
    ControllerRoutesAdmin.EventosAespera
)


// * Categoria
routerAdmin.post(RoutesAdmin.criarCategoria, ControllerRoutesAdmin.CriarCategoria)
routerAdmin.get(RoutesAdmin.listarCategoria, ControllerRoutesAdmin.ListarCategoria)
routerAdmin.delete(RoutesAdmin.apagarCategoria, ControllerRoutesAdmin.ApagarCategoria)
routerAdmin.put(RoutesAdmin.atualizarCategoria, ControllerRoutesAdmin.AtualizarCategoria)

// * TipoBilhete
routerAdmin.post(RoutesAdmin.criarTipoBilhete, ControllerRoutesAdmin.CriarTipoBilhete)
routerAdmin.get(RoutesAdmin.listarTipoBilhete, ControllerRoutesAdmin.ListarTipoBilhete)
routerAdmin.delete(RoutesAdmin.apagarTipoBilhete, ControllerRoutesAdmin.ApagarTipoBilhete)
routerAdmin.put(RoutesAdmin.atualizarTipoBilhete, ControllerRoutesAdmin.AtualizarTipoBilhete)


export { routerAdmin }