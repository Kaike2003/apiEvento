import { Request, Response } from "express";
import { prisma } from "../../../../prisma";
import { QueryParams } from "../../../../validation";



export const HistoricoEvento = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params

    const verificarUtilizadorExiste = await prisma.utilizador.findUnique({
        where: {
            id: idUtilizador
        }
    })

    try {

        if (!verificarUtilizadorExiste) {
            res.json("Valor nulo kk")
        } else {


            const historicoEvento = await prisma.utilizador.findMany({
                where: {
                    id: idUtilizador,
                },
                select: {
                    evento: {
                        where: {
                            utilizadorId: idUtilizador,
                            estado: "FINALIZADO"
                        }
                    }
                }
            }).then((sucesso) => {
                res.json({ "Historico de evento": sucesso })
            }).catch((error) => {
                res.json(error)
            })

        }

    } catch (error) {

    }

}