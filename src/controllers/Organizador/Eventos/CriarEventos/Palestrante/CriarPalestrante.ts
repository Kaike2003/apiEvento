import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"


export const CriarPalestrante = async (req: Request, res: Response) => {


    const { id } = req.params
    const idEvento: string = String(id)
    const { nome, blog } = req.body
    const verificarIdEvento = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    if (verificarIdEvento?.id === idEvento) {

        const criarPalestrante = await prisma.palestrante.create({
            data: {
                nome: nome,
                blog: blog,
                foto: "foto",
                evento: {
                    create: {
                        evento: {
                            connect: {
                                id: idEvento
                            }
                        }
                    }
                }
            }
        }).then((sucesso) => {
            res.status(201).json({ "Palestrante criado com sucesso": sucesso })
        }).catch((error)=>{
            res.status(400).json({"Criar palestrante erro": error})
        })


    } else {
        res.json({ "Id não existe ou evento não existe": idEvento })
    }

}