import { Request, Response } from "express"
import { prisma } from "../../../../prisma"



export const EditarEvento = async (req: Request, res: Response) => {


    // {
    //     "nome": "Angolbaaike Aartaaaoalomeu",
    //     "estado": "Desponivel",
    //     "descricao": "O shows do dias dos amores é muito fixé. Tem bons cantores...",
    //     "localizacao": "localizacao",
    //     "hora": "04:15:20",
    //     "dataInicio": "2023-03-28",
    //     "dataTermino": "2023-03-28",
    //     "utilizadorId": 1,
    //     "categoriaId": 1
    // }

    const { id } = req.params
    const { nome, descricao, localizacao, hora, foto, dataTermino, dataInicio, estado, utilizadorId, categoriaId } = req.body
    const idNumber: number = Number(id)

    const result: (String | Number)[] = [nome, descricao, localizacao, hora, dataTermino, dataInicio, estado, categoriaId, id]
    try {



        if (idNumber >= 1) {
            const atualizarTipoBilhete = await prisma.evento.update({
                where: {
                    id: idNumber
                }, data: {
                    nome: nome,
                    descricao: descricao,
                    localizacao: localizacao,
                    hora: hora,
                    dataTermino: dataTermino,
                    dataInicio: dataInicio,
                    estado: estado,
                    categoriaId: categoriaId
                }
            }).then((sucesso) => {
                res.status(200).json(sucesso)
            }).catch((error: any) => {
                res.status(400).json(error)
            })

        } else {
            res.status(400).json(`${idNumber} é inválido`)
            console.log(`${idNumber} é inválido`)
        }

    } catch (error: any) {
        res.status(400).json(error)
    }




}