import { Request, Response } from "express"
import { prisma } from "../../../../../prisma"


export const CriarBilhete = async (req: Request, res: Response) => {

    const { id } = req.params
    const idEvento: string = String(id)

    const {
        nome,
        preco,
        horaInicio,
        horaTermino,
        dataInicio,
        dataTermino,
        quantidade,
        tipoEvento
    } = req.body


    const result: (String | Number)[] = [nome, quantidade, preco, dataInicio, dataTermino, tipoEvento, idEvento]

    const verificarIdEvento = await prisma.evento.findFirst({
        where: {
            id: idEvento
        }
    })

    if (verificarIdEvento?.id === idEvento) {

        const criarBilhete = await prisma.bilhete.create({
            data: {
                nome: nome,
                preco: preco,
                horaInicio: new Date(`${dataInicio} ${horaInicio}`),
                horaTermino: new Date(`${dataTermino} ${horaTermino}`),
                dataInicio: new Date(dataInicio),
                dataTermino: new Date(dataTermino),
                quantidade: quantidade,
                tipoEvento: {
                    connect: {
                        id: tipoEvento
                    }
                },
                evento: {
                    connect: {
                        id: (idEvento)
                    }
                }
            }
        }).then((sucesso) => {
            res.status(201).json({ "Bilhete criado com sucesso": sucesso })
        }).catch((error) => {
            res.status(400).json({ "Bilhete erro": error, "Resultado": result })
        })


    } else {
        res.json({ "Id não existe ou evento não existe": idEvento })
    }

}