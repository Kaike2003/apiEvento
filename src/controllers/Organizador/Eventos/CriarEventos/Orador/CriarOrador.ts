import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"
import { OradorType, QueryParams } from "../../../../../validation"


export const CriarOrador = async (req: Request, res: Response) => {


    const { idEvento }: QueryParams = req.params
    const { nome }: OradorType = req.body

    
    const verificarIdEvento = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    if (verificarIdEvento?.id === idEvento) {

        const criarPalestrante = await prisma.orador.create({
            data: {
                nome: nome,
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
            res.status(201).json({ "Orador criado com sucesso": sucesso })
        }).catch((error) => {
            res.status(400).json({ "Criar orador erro": error })
        })


    } else {
        res.json({ "Id não existe ou evento não existe": idEvento })
    }

}