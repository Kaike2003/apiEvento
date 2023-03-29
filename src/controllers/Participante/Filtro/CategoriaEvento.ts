import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { QueryParams } from "../../../validation";


export const CategoriaEvento = async (req: Request, res: Response) => {

    const { idCategoria }: QueryParams = req.params


    const categoriaEvento = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            aprovado: true,
            categoriaId: idCategoria
        },
        include: {
            categoria: {
                select: {
                    nome: true,
                    id: true
                }
            }
        }

    }).then((sucesso) => {
        res.json({ "Todos eventos por categoria": sucesso })
    }).catch((error) => {
        res.json({ "Erro listar todos participantes": error })
    })


}