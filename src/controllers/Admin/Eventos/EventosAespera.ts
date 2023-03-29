import { Request, Response } from "express";



export const EventosAespera = async (req: Request, res: Response) => {


    res.json("Aqui serão listados os eventos que estarão a espera de serem aprovados...")

}