import { Request, Response } from "express";


export const AtualizarPalavraPasse = async (req: Request, res: Response) => {

res.json({
    "Informação": "Antes de tudo, quando tiveres a codificar essa opção. Mude de get para put(Update)",
    "Os campos serão" : "Palavra passe atual ,Palavra passe nova"
})

}