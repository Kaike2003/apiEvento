import { Request, Response } from "express"
import { prisma } from "../../prisma"
import bcrypt from "bcrypt"

export const Login = async (req: Request, res: Response) => {

    const { email, palavraPasse } = req.body

    const usuario = await prisma.utilizador.findUnique({ where: { email } });

    try {
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        const senhaCorreta = await bcrypt.compare(palavraPasse, usuario.palavraPasse);


        if (!senhaCorreta) {
            throw new Error('Senha incorreta');
        } else {
            res.json({

                "Usuario logado:": senhaCorreta,
                "Usuario encontrado:": usuario,
                "Sessão": req.session
            })

        }
    } catch (error) {
        res.json({ "Error": error, "Palavrapasse incorreta": palavraPasse })
    }
} 