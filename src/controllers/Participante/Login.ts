import { Request, Response } from "express";
import { prisma } from "../../prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const SECRET: string = "kaikebartolomeu"


export const LoginParticipante = async (req: Request, res: Response) => {




    const { email, palavraPasse } = req.body

    const usuario = await prisma.utilizador.findUnique({
        where: { email }
    });


    try {
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        const senhaCorreta = await bcrypt.compare(palavraPasse, usuario.palavraPasse);


        if (!senhaCorreta) {
            throw new Error('Senha incorreta');
        } else {

            if (usuario.utilizador === "PARTICIPANTE" && usuario.verificado === true) {
                const token = jwt.sign({
                    userId: usuario.id,
                }, SECRET, { expiresIn: "1d" })
                res.status(200).json({ autenticação: true, token, usuario })
            } else {
                res.json("Verifique sua conta para poder fazer login na aplicação.")
            }

            
        }
    } catch (error) {
        res.json({ "Error": error, "Palavra passe incorreta": palavraPasse })
    }







    // const { email, palavraPasse } = req.body

    // const usuario = await prisma.utilizador.findUnique({ where: { email } });

    // try {
    //     if (!usuario) {
    //         throw new Error('Usuário não encontrado');
    //     }

    //     const senhaCorreta = await bcrypt.compare(palavraPasse, usuario.palavraPasse);


    //     console.log(senhaCorreta)

    //     if (!senhaCorreta) {
    //         res.json('Senha incorreta');
    //     } else {
    //         if (usuario.utilizador === "PARTICIPANTE") {
    //             const token = jwt.sign({
    //                 userId: usuario.id,
    //             }, SECRET, { expiresIn: "1d" })
    //             res.json({ autenticação: true, token })
    //         }

    //     }
    // } catch (error) {
    //     res.json({ "Error": error, "Palavrapasse incorreta": palavraPasse })

    // }
} 