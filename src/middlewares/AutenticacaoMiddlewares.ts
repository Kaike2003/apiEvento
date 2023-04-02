import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { SECRET } from "../controllers/Admin/Login";


interface TokenPlayload {
    userId: string
    iat: number
    exp: number
}

export const Autenticacao = (req: Request, res: Response, next: NextFunction) => {


    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json("Valor nulo")
    } else {

        const token = authorization?.replace("Bearer", "").trim()

        try {
            const data = jwt.verify(token, SECRET)

            const { userId } = data as TokenPlayload

            req.userId = userId

            console.log(data)
            console.log("User id", req.userId = userId)
            return next()
        } catch (error) {
            res.json(error)
        }

    }


}