import { Utilizador } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken"
import { SECRET } from "../controllers/Admin/Login";


interface TokenPlayload {
    userId: string
    iat: number
    exp: number
}

// * Acesso restrito só para administradores.
export const PermissaoRotasAdmin = (cargo: string) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const { authorization } = req.headers

        if (!authorization) {
            res.status(401).json("Valor nulo")
        } else {

            const token = authorization?.replace("Bearer", "").trim()

            try {
                const data = jwt.verify(token, SECRET)

                const { userId } = data as TokenPlayload

                // console.log(data)
                // console.log("Permitir routas id", req.userId = userId)

                const CARGO: Utilizador | null = await prisma.utilizador.findFirst({
                    where: {
                        id: userId,
                    }
                })

                try {

                    if (!CARGO) {
                        res.json("O cargo não pode ser nulo.")
                    } else {

                        if (
                            CARGO.utilizador === cargo
                            && CARGO.id === userId) {
                            // console.log(`${cargo} tem acesso a todas rotas de ADMINISTRADOR`)
                            // res.json(`${cargo} tem acesso a todas rotas de ADMINISTRADOR`)
                            next()
                        } else {
                            res.status(401).json("Acesso negado. Rota só para administradores.")
                        }

                    }

                } catch (error) {
                    res.json(error)
                }



            } catch (error) {
                res.json(error)
            }

        }

    }



}

// * Acesso restrito só para organizadores de evento.
export const PermissaoRotasOrganizador = (cargo: string) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const { authorization } = req.headers

        if (!authorization) {
            res.status(401).json("Valor nulo")
        } else {

            const token = authorization?.replace("Bearer", "").trim()

            try {
                const data = jwt.verify(token, SECRET)

                const { userId } = data as TokenPlayload

                // console.log(data)
                // console.log("Permitir routas id", req.userId = userId)

                const CARGO: Utilizador | null = await prisma.utilizador.findFirst({
                    where: {
                        id: userId,
                        utilizador: "ORGANIZADOR"
                    }
                })

                try {

                    if (!CARGO) {
                        res.json("O cargo não pode ser nulo.")
                    } else {

                        console.log({
                            "Verificação": {
                                CargoId: CARGO.utilizador,
                                cargo: cargo
                            }
                        })

                        if (
                            CARGO.utilizador === cargo
                            && 
                            CARGO.id === userId
                            &&
                            CARGO.utilizador === "ORGANIZADOR"                           

                            ) {
                            console.log(`${cargo} tem acesso a todas rotas de ORGANIZADOR`)
                            // res.json(`${cargo} tem acesso a todas rotas de ORGANIZADOR`)
                            next()
                        } else {
                            res.status(401).json({ "Acesso negado. Rota só para organizadores de evento.": cargo })
                        }

                    }

                } catch (error) {
                    res.json(error)
                }



            } catch (error) {
                res.json(error)
            }

        }

    }



}


// * Acesso restrito só para Participantes.
export const PermissaoRotasParticipante = (cargo: string) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const { authorization } = req.headers

        if (!authorization) {
            res.status(401).json("Valor nulo")
        } else {

            const token = authorization?.replace("Bearer", "").trim()

            try {
                const data = jwt.verify(token, SECRET)

                const { userId } = data as TokenPlayload

                // console.log(data)
                // console.log("Permitir routas id", req.userId = userId)

                const CARGO: Utilizador | null = await prisma.utilizador.findFirst({
                    where: {
                        id: userId,
                        utilizador: "PARTICIPANTE"
                    }
                })

                try {

                    if (!CARGO) {
                        res.json("O cargo não pode ser nulo.")
                    } else {

                        if (
                            CARGO.utilizador === cargo
                            &&
                            CARGO.id === userId
                            &&
                            CARGO.utilizador === "PARTICIPANTE") {
                            console.log(`${cargo} tem acesso a todas rotas de PARTICIPANTES`)
                            // res.json(`${cargo} tem acesso a todas rotas de PARTICIPANTES`)
                            next()
                        } else {
                            res.status(401).json("Acesso negado. Rota só para participantes de evento.")
                        }

                    }

                } catch (error) {
                    res.json(error)
                }



            } catch (error) {
                res.json(error)
            }

        }

    }


}