import { Request, Response } from "express";


export const EventosMarcados = async (req: Request, res: Response) => {

    res.jsonp({
        "Informação": "Os eventos marcados que estarão na aplicação. Serão todos listados aqui.",
        "E os campos para os eventos marcados serão:": "nome, hora,localização, data inicio data termino ,descrição, tipo, nome, preço, quantidade, data de validade, estado do evento"
    })

}