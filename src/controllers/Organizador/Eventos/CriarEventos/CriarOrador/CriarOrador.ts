import { Request, Response } from "express";
import { prisma } from "../../../../../prisma";
import { OradorType, OradorOmit, VerificaoExiste_Orador } from "../../../../../validation";


export const CriarOrador = async (req: Request, res: Response) => {

    const { nome }: OradorType = req.body
    const { idEvento } = req.body

    const result = OradorOmit.parse({
        nome: nome
    })

    const verificaoExiste_orador: VerificaoExiste_Orador = {
        ExisteEventoQuantos: await prisma.evento.count(),
        ExistEvento: await prisma.evento.findFirst({
            where: {
                id: Number(idEvento)
            }
        })
    }

    try {

 
        if (verificaoExiste_orador.ExisteEventoQuantos === 0) {
            console.log("Não existe nenhum evento cadastrado")
            res.json("[Aviso!]Não existe nenhum evento cadastrado.")
        } else {
            if (verificaoExiste_orador.ExistEvento?.id === idEvento) {
                const Oradores = await prisma.orador.create({
                    data: {
                        nome: result.nome,
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
                    res.status(400).json(error)
                    console.log(error)
                })
            } else {
                console.log(`[Aviso!]Não existe um evento com esse id ${idEvento}`)
                res.status(400).json(`[Aviso!]Não existe um evento com esse id ${idEvento}`)
            }

        }

    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }

}

// const ExisteEvento = await prisma.evento.count()
// const Existe = await prisma.evento.findFirst()