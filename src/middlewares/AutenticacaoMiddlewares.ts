import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { SECRET } from "../controllers/Admin/Login";
import { prisma } from "../prisma";


interface TokenPlayload {
    userId: string
    iat: number
    exp: number
    nome: string
    email: string
}

export const Autenticacao = (req: Request, res: Response, next: NextFunction) => {


    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json("Valor nulo")
    } else {

        const token = authorization?.replace("Bearer", "").trim()

        try {
            const data = jwt.verify(token, SECRET)

            const { userId, nome, email } = data as TokenPlayload

            req.userId = userId
            req.nome = nome,
            req.email = email

            console.log(data)
            // console.log("User id", req.userId = userId)
            return next()
        } catch (error) {
            res.json(error)
        }

    }


}