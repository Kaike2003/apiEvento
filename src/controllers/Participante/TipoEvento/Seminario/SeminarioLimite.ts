import { Request, Response } from "express";
import { prisma } from "../../../../prisma";


export const SeminarioLimite = async (req: Request, res: Response) => {


    const { limite } = req.query


    const limitar: number = Number(limite)

    console.log("Limitador", limitar)

    const categoriaNome: string = String("seminário")

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
                },
                orderBy: {
                    at_create: "desc"
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
