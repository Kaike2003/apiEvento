import { Router } from "express";
import { ControllerParticipante } from "../../controllers";
import { RoutesParticipante } from "../enumRoutes";


const routerParticipante = Router()

// * Perfil

routerParticipante.post(RoutesParticipante.createParticipante, ControllerParticipante.Create)
routerParticipante.get(RoutesParticipante.atualizarInformacaoBasica, ControllerParticipante.AtualizarInformacaoBasica)
routerParticipante.get(RoutesParticipante.atualizarPalavraPasse, ControllerParticipante.AtualizarPalavraPasse)
routerParticipante.get(RoutesParticipante.informacaoBasica, ControllerParticipante.InformacaoBasica)
routerParticipante.get(RoutesParticipante.sair, ControllerParticipante.Sair)
routerParticipante.get(RoutesParticipante.historicoCompra, ControllerParticipante.HistoricoCompra)
routerParticipante.get(RoutesParticipante.notificacoes, ControllerParticipante.Notificacoes)
routerParticipante.get(RoutesParticipante.detalhaCompra, ControllerParticipante.DetalheCompra)

// * Filtro

routerParticipante.get(RoutesParticipante.categoriaEvento, ControllerParticipante.CategoriaEvento)
routerParticipante.get(RoutesParticipante.mes, ControllerParticipante.Mes)
// * Meus eventos

routerParticipante.get(RoutesParticipante.historico, ControllerParticipante.Historico)
routerParticipante.get(RoutesParticipante.historico, ControllerParticipante.BilheteHistorico)

// * Eventos

routerParticipante.get(RoutesParticipante.eventosNovos, ControllerParticipante.EventosNovos)
routerParticipante.get(RoutesParticipante.eventosTodos, ControllerParticipante.EventosTodos)
routerParticipante.get(RoutesParticipante.eventosTopMes, ControllerParticipante.EventosTopMes)

// * Tipo Evento

routerParticipante.get(RoutesParticipante.tipoEvento, ControllerParticipante.TipoEvento)
routerParticipante.get(RoutesParticipante.tipoEventoDetalhe, ControllerParticipante.TipoEventoDetalhe)

// * Bilhete e Compra

routerParticipante.get(RoutesParticipante.bilhete, ControllerParticipante.Bilhete)
routerParticipante.get(RoutesParticipante.compra, ControllerParticipante.Compra)


export { routerParticipante }