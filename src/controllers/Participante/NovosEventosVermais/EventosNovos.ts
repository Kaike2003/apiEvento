import { Request, Response } from "express";
import { prisma } from "../../../prisma";

export const EventosNovos = async (req: Request, res: Response) => {


    const listarTodosEventos = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false
        },
        orderBy: {
            at_create: "desc"
        }
    }).then((sucesso) => {
        res.json({ "Todos eventos": sucesso })
    }).catch((error) => {
        res.json({ "Erro listar todos participantes": error })
    })

}