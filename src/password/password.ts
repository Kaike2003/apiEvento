import { hash } from "bcrypt"


export const Password = async (senha: string): Promise<string> => {

    return await hash(senha, 8)

}