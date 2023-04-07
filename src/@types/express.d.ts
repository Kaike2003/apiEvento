declare namespace Express {
    export interface Request {
        userId: string
        nome: string,
        email: string
        admin: boolean
    }
}