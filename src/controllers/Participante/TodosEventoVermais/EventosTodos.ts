import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const EventosTodos = async (req: Request, res: Response) => {



    const listarTodosEventos = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false
        }
    }).then((sucesso) => {
        res.json({ "Todos eventos": sucesso })
    }).catch((error) => {
        res.json({ "Erro listar todos participantes": error })
    })

}