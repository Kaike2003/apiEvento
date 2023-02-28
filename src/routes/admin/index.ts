import { Router } from "express";
import { ControllerRoutesAdmin } from "../../controllers";

import { RoutesAdmin } from "../enumRoutes";


const routerAdmin = Router()


routerAdmin.get(RoutesAdmin.loginAdmin, ControllerRoutesAdmin.Login)
routerAdmin.post(RoutesAdmin.post, ControllerRoutesAdmin.Create)
routerAdmin.get(RoutesAdmin.listaAdministradores, ControllerRoutesAdmin.ListaAdministradores)
routerAdmin.get(RoutesAdmin.eventosMarcados, ControllerRoutesAdmin.EventosMarcados)
routerAdmin.get(RoutesAdmin.participante, ControllerRoutesAdmin.Participante)
routerAdmin.get(RoutesAdmin.organizador, ControllerRoutesAdmin.Organizador)
routerAdmin.get(RoutesAdmin.informacaoBasica, ControllerRoutesAdmin.InformacaoBasica)
routerAdmin.get(RoutesAdmin.atualizarPalavraPasse, ControllerRoutesAdmin.AtualizarPalavraPasse)
routerAdmin.get(RoutesAdmin.atualizarInformacaoBasica, ControllerRoutesAdmin.AtualizarInformacaoBasica )
routerAdmin.get(RoutesAdmin.sair, ControllerRoutesAdmin.Sair)

// * Categoria
routerAdmin.post(RoutesAdmin.criarCategoria, ControllerRoutesAdmin.CriarCategoria)
routerAdmin.get(RoutesAdmin.listarCategoria, ControllerRoutesAdmin.ListarCategoria)
routerAdmin.delete(RoutesAdmin.apagarCategoria, ControllerRoutesAdmin.ApagarCategoria)
routerAdmin.get(RoutesAdmin.atualizarCategoria, ControllerRoutesAdmin.AtualizarCategoria)

// * TipoBilhete
routerAdmin.post(RoutesAdmin.criarTipoBilhete, ControllerRoutesAdmin.CriarTipoBilhete)
routerAdmin.get(RoutesAdmin.listarTipoBilhete, ControllerRoutesAdmin.ListarTipoBilhete)
routerAdmin.delete(RoutesAdmin.apagarTipoBilhete, ControllerRoutesAdmin.ApagarTipoBilhete)
routerAdmin.get(RoutesAdmin.atualizarTipoBilhete, ControllerRoutesAdmin.AtualizarTipoBilhete)


export { routerAdmin }