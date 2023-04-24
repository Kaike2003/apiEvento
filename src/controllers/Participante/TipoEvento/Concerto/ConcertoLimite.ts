import { Request, Response } from "express";
import { prisma } from "../../../../prisma";


export const ConcertoLimite = async (req: Request, res: Response) => {


    const { limite } = req.query


    const limitar: number = Number(limite)

    console.log("Limitador", limitar)

    const categoriaNome: string = String("concerto")
    const listarTeatros = await prisma.categoria.findFirst({
        where: {
            nome: categoriaNome
        }
    }).then(async (sucesso) => {


        if (!sucesso) {
            res.json("O nome da categoria não pode ser nulo")
            console.log(sucesso)
        } else {


            const listarEventosTeatros = await prisma.evento.findMany({
                where: {
                    categoriaId: sucesso.id,
                    aprovado: true,
                    publicado: true,
                    banido: false,
                }, include: {
                    bilhete: {
                        include: {
                            evento: {
                                include: {
                                    bilhete: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    at_create: "desc"
                },
                take: limitar
            }).then((evento) => {

                res.json(evento)
                console.log(evento)


            }).catch((error) => {
                console.log(error)
                res.json(error)
            })


        }


    }).catch((error) => {
        res.json(error)
        console.log(error)
    })

}
