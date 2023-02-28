import { Request, Response } from "express"


export const Sair = async (req: Request, res: Response) => {

    res.json({
        "Informação": "Aqui a opção sair da conta",
        "Saiste da aplicação": "Se puder nunca mas volte kkk"
    })

}