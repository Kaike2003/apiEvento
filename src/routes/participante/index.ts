import { Router } from "express";
import { ControllerParticipante } from "../../controllers";
import { EmailAutenticacao } from "../../middlewares/EmailAutenticacao";
import { PermissaoRotasParticipante } from "../../middlewares/PermissaoRotas";
import { RoutesParticipante } from "../enumRoutes";

const permissaoPARTICIPANTE: string = "PARTICIPANTE"


const routerParticipante = Router()

// * Perfil

routerParticipante.post(
    RoutesParticipante.createParticipante,
    ControllerParticipante.Create)


routerParticipante.post(
    RoutesParticipante.loginParticipante,
    ControllerParticipante.LoginParticipante
)

routerParticipante.put(
    RoutesParticipante.verificarContaPalestrante,
    ControllerParticipante.VerificarContaParticipante
)


routerParticipante.put(
    RoutesParticipante.atualizarInformacaoBasica,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.AtualizarInformacaoBasica)

routerParticipante.put(
    RoutesParticipante.atualizarPalavraPasse,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.AtualizarPalavraPasse)

routerParticipante.get(
    RoutesParticipante.informacaoBasica,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.InformacaoBasica)

routerParticipante.get(
    RoutesParticipante.sair,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.Sair)

routerParticipante.get(
    RoutesParticipante.historicoCompra,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.HistoricoCompra)

routerParticipante.get(
    RoutesParticipante.notificacoes,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.Notificacoes)

routerParticipante.get(
    RoutesParticipante.detalhaCompra,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.DetalheCompra)

// * Filtro

routerParticipante.get(
    RoutesParticipante.categoriaEvento,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.CategoriaEvento)

routerParticipante.get(
    RoutesParticipante.mes,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.Mes)
// * Meus eventos

routerParticipante.get(
    RoutesParticipante.historico,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.Historico)

routerParticipante.get(
    RoutesParticipante.historico,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.
        BilheteHistorico)

// * Eventos

routerParticipante.get(
    RoutesParticipante.eventosNovos,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.EventosNovos)

routerParticipante.get(
    RoutesParticipante.eventosTodos,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.EventosTodos)

routerParticipante.get(
    RoutesParticipante.visualizarEvento,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.VisualizarEvento)

routerParticipante.get(
    RoutesParticipante.visualiarPalestrante,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.VisualiarPalestrante)

// * Tipo Evento

routerParticipante.get(
    RoutesParticipante.tipoEvento,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.TipoEvento)

routerParticipante.get(
    RoutesParticipante.tipoEventoDetalhe,
    PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.TipoEventoDetalhe)

// *  Compra

routerParticipante.post(
    RoutesParticipante.compra,
    // PermissaoRotasParticipante(permissaoPARTICIPANTE),
    ControllerParticipante.Compra)

// * Recuperar Senha
routerParticipante.put(
    RoutesParticipante.recuperarSenhaParticipante,
    ControllerParticipante.RecuperarSenha
)


export { routerParticipante }