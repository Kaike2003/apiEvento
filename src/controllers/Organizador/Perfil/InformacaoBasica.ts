import { Request, Response } from "express"


export const InformacaoBasica = async (req: Request, res: Response) => {

    res.json({
        "Informação": "Aqui serão mostrado as informações no perfil do administrador e será preciso utilizar o req.params para poder pegar o id",
        "Os campos serão": "Nome, Email, Palavra Passe"
    })

}