import { Request, Response } from "express";
import { prisma } from "../../../prisma";


export const CategoriaEvento = async (req: Request, res: Response) => {

    const { idCategoria } = req.params
    const idEventoCategoria: string = String(idCategoria)


    const categoriaEvento = await prisma.evento.findMany({
        where: {
            publicado: true,
            banido: false,
            categoriaId: idEventoCategoria
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
        res.json({ "Todos eventos": sucesso })
    }).catch((error) => {
        res.json({ "Erro listar todos participantes": error })
    })


}