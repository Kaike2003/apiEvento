import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
import { PalestranteType, PalestranteOmit, VerificaoExiste_Palestrante } from "../../../../../validation";


export const CriarPalestrante = async (req: Request, res: Response) => {

    const { nome, blog }: PalestranteType = req.body
    const { idEvento } = req.body

    const result = PalestranteOmit.parse({
        nome: nome,
        blog: blog
    })

    const verificaoExiste_Palestrante: VerificaoExiste_Palestrante = {
        ExisteEvento: await prisma.evento.count(),
        ExisteIdEvento: await prisma.evento.findFirst({
            where: {
                id: Number(idEvento)
            }
        })
    }

    try {

        // const ExisteEvento = await prisma.evento.count()
        // const ExisteIdEvento = await prisma.evento.findFirst({
        //     where:{
        //         id : Number(idEvento)
        //     }
        // })

        if (verificaoExiste_Palestrante.ExisteEvento === 0) {
            console.log("Não existe nenhum evento cadastrado")
            res.json("[Aviso!]Não existe nenhum evento cadastrado.")
        } else {
            if (verificaoExiste_Palestrante.ExisteIdEvento?.id === Number(idEvento)) {
                const Palestrantes = await prisma.palestrante.create({
                    data: {
                        nome: result.nome,
                        blog: result.blog,
                        foto: String(req.file?.originalname),
                        evento: {
                            create: {
                                evento: {
                                    connect: {
                                        id: Number(idEvento)
                                    }
                                }
                            }
                        }
                    }
                }).then((sucesso) => {
                    res.status(201).json(sucesso)
                    console.log(sucesso)
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                console.log(`[Aviso!]Não existe um evento com esse id ${idEvento}`)
                res.status(400).json(`[Aviso!]Não existe um evento com esse id ${idEvento}`)

            }

        }

    } catch (error) {
        console.log(error)
        res.json(error)
    }



}
