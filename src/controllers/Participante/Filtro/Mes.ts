import { Request, Response } from "express";
import { prisma } from "../../../prisma";
import { QueryParams } from "../../../validation";

export const Mes = async (req: Request, res: Response) => {

    const { numeroData }: QueryParams = req.params



    // const filtroMes = await prisma.evento.findMany({
    //     where: {
    //         publicado: true,
    //         banido: false,
    //         aprovado: true,
    //     }
    // }).then((sucesso) => {
    //     // res.json({ "Todos eventos por mês": sucesso })




    // }).catch((error) => {
    //     res.json({ "Erro listar todos os eventos por mês": error })
    // })


}