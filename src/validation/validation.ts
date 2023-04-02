import { z } from "zod"
import { Utilizador, Evento, TipoBilhete } from "@prisma/client";
import { type } from "os";

// * Esquema utilizador
// * Falta valizadar no esquema utilizador esses dois campos
// utilizador

export const UtilizadorSchema = z.object({
    id: z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve ter 2 ou mais caracteres" })
        .max(40, { message: "O nome deve ter 40 ou menos caracteres" }),
    email: z.string({
        required_error: "O email é obrigatório",
        invalid_type_error: "O email deve ser uma string"
    }).email({ message: "Endereço de email invalido" }),
    palavraPasse: z.string({
        required_error: "A palavra passe é obrigatória",
        invalid_type_error: "A palavra passe deve ser uma string"
    }).
        min(4, { message: "A palavra passe deve ter 2 ou mais caracteres" }).
        max(100, { message: "A palavra passe deve ter 70 ou menos caracteres" }),
    palavraPasseAntiga: z.string({
        required_error: "A palavra passe é obrigatória",
        invalid_type_error: "A palavra passe deve ser uma string"
    }).
        min(4, { message: "A palavra passe deve ter 2 ou mais caracteres" }).
        max(100, { message: "A palavra passe deve ter 70 ou menos caracteres" }),
    dataNascimento: z.date({
        required_error: "Selecione uma data",
        invalid_type_error: "A data deve ser uma Data"
    })
        .min(new Date("1925-01-01"), { message: "Idade inválida. Velho demais" })
        .max(new Date("2023-12-31"), { message: "Idade inválida. Muito jovem!" }),
    localizacao: z.string({
        required_error: "O endereço é obrigatório",
        invalid_type_error: "O endereço deve ser uma string"
    })
        .min(3, { message: "O endereço deve ter 15 ou mais caracteres" })
        .max(60, { message: "O endereço deve ter 60 ou menos caracteres" }),
    telefone: z.string({
        required_error: "O número de telefone é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(9, { message: "O número de telefone deve ter 9 ou mais caracteres" })
        .max(9, { message: "O número de telefone deve ter 60 ou menos caracteres" })
})

// * Esquema Evento

export const EventoSchema = z.object({
    id: z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(100, { message: "O nome deve conter 30 ou menos caracteres" }),
    foto: z.string({
        required_error: "O nome da foto é obrigatório",
        invalid_type_error: "O nome da foto deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(200, { message: "O nome deve conter 200 ou menos caracteres" }).optional(),
    horaInicio: z.date({
        required_error: "A hora é obrigatória",
        invalid_type_error: "A hora deve ser um inteiro"
    }),
    horaTermino: z.date({
        required_error: "A hora é obrigatória",
        invalid_type_error: "A hora deve ser um inteiro"
    }),
    dataInicio: z.date({
        required_error: "O data de inicio é obrigatório",
        invalid_type_error: "A data deve ser uma data"
    })
        .min(new Date(), { message: "Data inválida" }),
    dataTermino: z.date({
        required_error: "O data de termino é obrigatório",
        invalid_type_error: "A data deve ser uma data"
    }),

    descricao: z.string({
        required_error: "A descrição é obrigatória",
        invalid_type_error: "A descrição de ser uma string"
    })
        .min(15, { message: "A descrição deve ter 15 ou mais caracteres" })
        .max(4000, { message: "A descrição deve ter 200 ou menos caracteres" })
    ,
    provincia: z.string({
        required_error: "O nome da provincia é obrigatório",
        invalid_type_error: "O nome provincia deve ser uma string"
    })
        .min(3, { message: "O nome da provincia deve ter 3 ou mais caracteres" })
        .max(200, { message: "O nome da provincia deve ter 60 ou menos caracteres" }),
    municipio: z.string({
        required_error: "O nome municipio é obrigatório",
        invalid_type_error: "O nome municipio deve ser uma string"
    })
        .min(3, { message: "O nome municipio deve ter 3 ou mais caracteres" })
        .max(80, { message: "O nome municipio deve ter 60 ou menos caracteres" }),
    bairro: z.string({
        required_error: "O nome bairro é obrigatório",
        invalid_type_error: "O nome bairro deve ser uma string"
    })
        .min(3, { message: "O nome bairoo deve ter 3 ou mais caracteres" })
        .max(120, { message: "O nome bairro deve ter 60 ou menos caracteres" }),
    categoriaId: z.string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "O id da categoria deve ser uma string"
    })
        .min(3, { message: "O id da categoria deve ter 3 ou mais caracteres" })
        .max(420, { message: "O id da categoria deve ter 60 ou menos caracteres" })
})


// * Esquema Categoria

export const CategoriaSchema = z.object({
    id: z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" })

})

export const TipoBilheteSchema = z.object({
    id: z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" })

})


// * Esquema Palestrante

export const PalestranteSchema = z.object({
    id: z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" }),
    blog: z.union([z.string({ invalid_type_error: "O nome deve ser uma string" }), z.literal("")]),
    foto: z.string().optional()
})

// * Orador

export const OradorSchema = z.object({
    id: z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" })
})


// * Esquema Bilhete

export const BilheteSchema = z.object({
    id: z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" }),
    tipoEvento: z.string({
        required_error: "O id do tipo do evento é obrigátorio",
        invalid_type_error: "O id do tipo deve ser uma string"
    })
        .min(3, { message: "O id do tipo evento deve conter 2 ou mais caracteres" })
        .max(300, { message: "O id do tipo evento deve conter 30 ou menos caracteres" }),
    quantidade: z.number({
        required_error: "A quantidade é obrigátorio",
        invalid_type_error: "A quantidade deve ser um inteiro"
    }).int({ message: "O quantidade deve ser inteiro" }).positive({ message: "O quantidade deve ser com números positivos" }),
    preco: z.number({
        required_error: "O preço é obrigátorio",
        invalid_type_error: "O preço deve ser um inteiro"
    }).int({ message: "O preço deve ser inteiro" }).positive({ message: "O preço deve ser com números positivos" }),
    horaInicio: z.date({
        required_error: "A hora de inicico é obrigatória",
        invalid_type_error: "A hora de inicio deve ser um inteiro"
    }),
    horaTermino: z.date({
        required_error: "A hora de termino é obrigatória",
        invalid_type_error: "A hora de termino deve ser um inteiro"
    }),
    dataInicio: z.date({
        required_error: "O data de inicio é obrigatório",
        invalid_type_error: "A data deve ser uma data"
    })
        .min(new Date(), { message: "Data inválida" }),
    dataTermino: z.date({
        required_error: "O data de termino é obrigatório",
        invalid_type_error: "A data deve ser uma data"
    })
})

// * Esquema compra

export const CompraSchema = z.object({
    id: z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    quantidade: z.number({
        required_error: "A quantidade é obrigátorio",
        invalid_type_error: "A quantidade deve ser um inteiro"
    }).int({ message: "O quantidade deve ser inteiro" }).positive({ message: "O quantidade deve ser com números positivos" }),
    metodoPagamento: z.string({
        required_error: "O nome do metodo de pagamento é obrigatório",
        invalid_type_error: "O metodo de pagamento deve ser uma string"
    })
        .min(3, { message: "O nome metodo de pagamento deve conter 2 ou mais caracteres" })
        .max(60, { message: "O nome metodo de pagamento deve conter 30 ou menos caracteres" })

})


// * Esquemas const com o Omit para cada usuário
export const AdminTypeOmit = UtilizadorSchema.omit(
    {
        id: true, localizacao: true, telefone: true,
        palavraPasseAntiga: true
    })

export const AdminTypeAtualizarInfo = UtilizadorSchema.omit(
    { id: true, palavraPasse: true, localizacao: true, telefone: true }
)

export const AdminAtualizarPalavraPasseOmit = UtilizadorSchema.omit({
    id: true, localizacao: true, telefone: true, email: true,
    palavraPasse: true, palavraPasseAntiga: true
})


export const ParticipanteOmit = UtilizadorSchema.omit({ id: true, palavraPasseAntiga: true })


export const ParticipanteOmitAtualizarInformacao = UtilizadorSchema.omit({ id: true, palavraPasse: true, palavraPasseAntiga: true, email: true })

export const OrganizadorOmitAtualizarInformacao = UtilizadorSchema.omit({ id: true, palavraPasse: true, palavraPasseAntiga: true, email: true })

export const UtilizadorOmitAtualizarPalavaraPasse = UtilizadorSchema.omit({
    id: true, dataNascimento: true, email: true, localizacao: true, nome: true, telefone: true
})

export const OrganizadorOmit = UtilizadorSchema.omit({ id: true, palavraPasseAntiga: true })

// * Esquema const com o Omit para evento

export const EventoOmit = EventoSchema.omit({ id: true })

// * Esquema const com o Omit para categoria

export const CategoriaOmit = CategoriaSchema.omit({ id: true })

// * Esquema const com o Omit para TipoBilhete

export const TipoBilheteOmit = TipoBilheteSchema.omit({ id: true })

// * Esquema const com o Omit para Palestrante

export const PalestranteOmit = PalestranteSchema.omit({ id: true })

// * Esquema const Omit para Bilhete

export const BilheteOmit = BilheteSchema.omit({ id: true })

// * Esquema const Omit para Compra

export const CompraOmit = CompraSchema.omit({ id: true })

// * Esquema const Omit para Orador

export const OradorOmit = OradorSchema.omit({ id: true })



// * Types 
export type AdminType = z.infer<typeof AdminTypeOmit>
export type ParticipanteType = z.infer<typeof ParticipanteOmit>
export type UtilizadorOmitAtualizarPalavaraPasseType = z.infer<typeof UtilizadorOmitAtualizarPalavaraPasse>
export type OrganizadorType = z.infer<typeof OrganizadorOmit>
export type EventoType = z.infer<typeof EventoOmit>
export type CategoriaType = z.infer<typeof CategoriaOmit>
export type PalestranteType = z.infer<typeof PalestranteOmit>
export type CompraType = z.infer<typeof CompraOmit>
export type BilheteType = z.infer<typeof BilheteOmit>
export type TipoBilheteType = z.infer<typeof TipoBilheteOmit>
export type OradorType = z.infer<typeof OradorOmit>
export type TypeAdminAtualizarInformacao = z.infer<typeof AdminTypeAtualizarInfo>

// ! Pequenas validações

// * Criar Evento

// ? Type para a hora e data (validação)
export type Hora_Data_Validacao = {
    horaInicio: number,
    horaTermino: number,
}

// ? Type para as váriaveis que vão receber dados da base de dados peloprisma ( Verificação /validação)

export type VerificaoExiste_Evento = {
    ExisteCategoria: number,
    ExisteTipoBilhete: number,
    ExisteUtilizador: number,
    ExisteUtilizadorId: Utilizador | null,
    ExistEvento: Evento | null
}


export type VerificaoExiste_Orador = {
    ExisteEventoQuantos: number,
    ExistEvento: Evento | null
}

// ? Type para as váriaveis estado, utilizadorId, categoriaId ( Verificação /validação)

export type Validacao = {
    estado?: string,
    idUtilizador?: string,
    categoriaId?: string
}

export type QueryParams = {
    idEvento?: string
    idBilhete?: string
    idOrador?: string
    idPalestrante?: string
    idUtilizador?: string
    idCategoria?: string
    numeroData?: number
}


// ? Type para as váriaveis do Criar Bilhete

export type VerificaoExiste_Bilhete = {
    ExisteIdEvento: number,
    ExisteEvento: Evento | null,
    ExisteTipoBilheteFindirst: TipoBilhete | null,
    ExisteTipoBilhete: number
}

// ? Type para as váriaveis do Criar Palestrante

export type VerificaoExiste_Palestrante = {
    ExisteEvento: number,
    ExisteIdEvento: Evento | null
}

// ? Type para as váriaveis do Criar Palestrante

export type VerificaoExiste_Organizador = {
    ExisteEmail: Utilizador | null
}

// ? Type para as váriaveis do Criar Admin

export type VerificarcaoExiste_Admin = {
    ExisteEmail: Utilizador | null
}

export type VerificarcaoExiste_Participante = {
    ExisteEmail: Utilizador | null
}

