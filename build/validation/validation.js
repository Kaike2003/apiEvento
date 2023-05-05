"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OradorOmit = exports.ReservaOmit = exports.BilheteOmit = exports.PalestranteOmit = exports.TipoBilheteOmit = exports.CategoriaOmit = exports.EventoOmit = exports.OrganizadorOmit = exports.UtilizadorOmitAtualizarPalavaraPasse = exports.OrganizadorOmitAtualizarInformacao = exports.ParticipanteOmitAtualizarInformacao = exports.ParticipanteOmit = exports.AdminAtualizarPalavraPasseOmit = exports.AdminTypeAtualizarInfo = exports.AdminTypeOmit = exports.UtilizadorSchemaInformaçãoPerfil = exports.ReservaSchema = exports.BilheteSchema = exports.OradorSchema = exports.PalestranteSchema = exports.TipoBilheteSchema = exports.CategoriaSchema = exports.EventoSchema = exports.UtilizadorSchema = void 0;
const zod_1 = require("zod");
// * Esquema utilizador
// * Falta valizadar no esquema utilizador esses dois campos
// utilizador
exports.UtilizadorSchema = zod_1.z.object({
    id: zod_1.z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: zod_1.z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve ter 2 ou mais caracteres" })
        .max(40, { message: "O nome deve ter 40 ou menos caracteres" }),
    email: zod_1.z.string({
        required_error: "O email é obrigatório",
        invalid_type_error: "O email deve ser uma string"
    }).email({ message: "Endereço de email invalido" }),
    palavraPasse: zod_1.z.string({
        required_error: "A palavra passe é obrigatória",
        invalid_type_error: "A palavra passe deve ser uma string"
    }).
        min(4, { message: "A palavra passe deve ter 2 ou mais caracteres" }).
        max(100, { message: "A palavra passe deve ter 70 ou menos caracteres" }),
    palavraPasseAntiga: zod_1.z.string({
        required_error: "A palavra passe é obrigatória",
        invalid_type_error: "A palavra passe deve ser uma string"
    }).
        min(4, { message: "A palavra passe deve ter 2 ou mais caracteres" }).
        max(100, { message: "A palavra passe deve ter 70 ou menos caracteres" }),
    dataNascimento: zod_1.z.date({
        required_error: "Selecione uma data",
        invalid_type_error: "A data deve ser uma Data"
    })
        .min(new Date("1925-01-01"), { message: "Idade inválida. Velho demais" })
        .max(new Date("2004-12-31"), { message: "Idade inválida. Muito jovem!" }),
    localizacao: zod_1.z.string({
        required_error: "O endereço é obrigatório",
        invalid_type_error: "O endereço deve ser uma string"
    })
        .min(3, { message: "O endereço deve ter 15 ou mais caracteres" })
        .max(60, { message: "O endereço deve ter 60 ou menos caracteres" }),
    telefone: zod_1.z.number({
        required_error: "O número de telefone é obrigatório",
        invalid_type_error: "O número deve ser um number"
    }).min(100000000, { message: "O número telefone deve ser menor que 11111111" })
        .max(999999999, { message: "O número de telefone de menor que 99999999" }),
    iban: zod_1.z.string({
        required_error: "O IBAN é obrigatório",
        invalid_type_error: "O IBAN deve ser uma string"
    })
        .min(25, { message: "O IBAN deve ter 10 ou mais caracteres" })
        .max(40, { message: "O IBAN deve ter 40 ou menos caracteres" }).optional(),
});
// * Esquema Evento
exports.EventoSchema = zod_1.z.object({
    id: zod_1.z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: zod_1.z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(100, { message: "O nome deve conter 100 ou menos caracteres" }),
    foto: zod_1.z.string({
        required_error: "O nome da foto é obrigatório",
        invalid_type_error: "O nome da foto deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(200, { message: "O nome deve conter 200 ou menos caracteres" }).optional(),
    horaInicio: zod_1.z.date({
        required_error: "A hora é obrigatória",
        invalid_type_error: "A hora deve ser um inteiro"
    }),
    horaTermino: zod_1.z.date({
        required_error: "A hora é obrigatória",
        invalid_type_error: "A hora deve ser um inteiro"
    }),
    dataInicio: zod_1.z.date({
        required_error: "O data de inicio é obrigatório",
        invalid_type_error: "A data deve ser uma data"
    })
        .min(new Date(), { message: "Data inválida" }),
    dataTermino: zod_1.z.date({
        required_error: "O data de termino é obrigatório",
        invalid_type_error: "A data deve ser uma data"
    }),
    descricao: zod_1.z.string({
        required_error: "A descrição é obrigatória",
        invalid_type_error: "A descrição de ser uma string"
    })
        .min(200, { message: "A descrição deve ter 200 ou mais caracteres" })
        .max(289, { message: "A descrição deve ter 289 ou menos caracteres" }),
    provincia: zod_1.z.string({
        required_error: "O nome da provincia é obrigatório",
        invalid_type_error: "O nome provincia deve ser uma string"
    })
        .min(3, { message: "O nome da provincia deve ter 3 ou mais caracteres" })
        .max(200, { message: "O nome da provincia deve ter 60 ou menos caracteres" }),
    municipio: zod_1.z.string({
        required_error: "O nome municipio é obrigatório",
        invalid_type_error: "O nome municipio deve ser uma string"
    })
        .min(3, { message: "O nome municipio deve ter 3 ou mais caracteres" })
        .max(80, { message: "O nome municipio deve ter 60 ou menos caracteres" }),
    bairro: zod_1.z.string({
        required_error: "O nome bairro é obrigatório",
        invalid_type_error: "O nome bairro deve ser uma string"
    })
        .min(3, { message: "O nome bairoo deve ter 3 ou mais caracteres" })
        .max(120, { message: "O nome bairro deve ter 60 ou menos caracteres" }),
    categoriaId: zod_1.z.string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "O id da categoria deve ser uma string"
    })
        .min(3, { message: "O id da categoria deve ter 3 ou mais caracteres" })
        .max(420, { message: "O id da categoria deve ter 60 ou menos caracteres" })
});
// * Esquema Categoria
exports.CategoriaSchema = zod_1.z.object({
    id: zod_1.z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: zod_1.z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" })
});
exports.TipoBilheteSchema = zod_1.z.object({
    id: zod_1.z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: zod_1.z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" })
});
// * Esquema Palestrante
exports.PalestranteSchema = zod_1.z.object({
    id: zod_1.z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: zod_1.z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" }),
    blog: zod_1.z.union([zod_1.z.string({ invalid_type_error: "O nome deve ser uma string" }), zod_1.z.literal("")]),
    foto: zod_1.z.string().optional()
});
// * Orador
exports.OradorSchema = zod_1.z.object({
    id: zod_1.z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: zod_1.z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" })
});
// * Esquema Bilhete
exports.BilheteSchema = zod_1.z.object({
    id: zod_1.z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    nome: zod_1.z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve conter 2 ou mais caracteres" })
        .max(30, { message: "O nome deve conter 30 ou menos caracteres" }),
    tipoEvento: zod_1.z.string({
        required_error: "O id do tipo do evento é obrigátorio",
        invalid_type_error: "O id do tipo deve ser uma string"
    })
        .min(3, { message: "O id do tipo evento deve conter 2 ou mais caracteres" })
        .max(300, { message: "O id do tipo evento deve conter 30 ou menos caracteres" }),
    quantidade: zod_1.z.number({
        required_error: "A quantidade é obrigátorio",
        invalid_type_error: "A quantidade deve ser um inteiro"
    }).int({ message: "O quantidade deve ser inteiro" }).positive({ message: "O quantidade deve ser com números positivos" }),
    preco: zod_1.z.number({
        required_error: "O preço é obrigátorio",
        invalid_type_error: "O preço deve ser um inteiro"
    }).int({ message: "O preço deve ser inteiro" }).positive({ message: "O preço deve ser com números positivos" }),
    horaInicio: zod_1.z.date({
        required_error: "A hora de inicico é obrigatória",
        invalid_type_error: "A hora de inicio deve ser um inteiro"
    }),
    horaTermino: zod_1.z.date({
        required_error: "A hora de termino é obrigatória",
        invalid_type_error: "A hora de termino deve ser um inteiro"
    }),
    dataInicio: zod_1.z.date({
        required_error: "O data de inicio é obrigatório",
        invalid_type_error: "A data deve ser uma data"
    })
        .min(new Date(), { message: "Data inválida" }),
    dataTermino: zod_1.z.date({
        required_error: "O data de termino é obrigatório",
        invalid_type_error: "A data deve ser uma data"
    })
});
// * Esquema compra
exports.ReservaSchema = zod_1.z.object({
    id: zod_1.z.number({
        required_error: "O id é obrigátorio",
        invalid_type_error: "O id deve ser um inteiro"
    }).int({ message: "O id deve ser inteiro" }).positive({ message: "O id deve ser com números positivos" }),
    quantidade: zod_1.z.number({
        required_error: "A quantidade é obrigátorio",
        invalid_type_error: "A quantidade deve ser um inteiro"
    }).int({ message: "O quantidade deve ser inteiro" }).positive({ message: "O quantidade deve ser com números positivos" }),
    metodoPagamento: zod_1.z.string({
        required_error: "O nome do metodo de pagamento é obrigatório",
        invalid_type_error: "O metodo de pagamento deve ser uma string"
    })
        .min(3, { message: "O nome metodo de pagamento deve conter 2 ou mais caracteres" })
        .max(60, { message: "O nome metodo de pagamento deve conter 30 ou menos caracteres" }),
    bilheteId: zod_1.z.string({
        required_error: "O id do bilhete é obrigatório",
        invalid_type_error: "O id do bilhete deve ser uma string"
    })
        .min(3, { message: "O id do bilhete deve conter 2 ou mais caracteres" })
        .max(400, { message: "O id do bilhete deve conter 400 ou menos caracteres" })
});
// * Esquema opcional informação perfil
exports.UtilizadorSchemaInformaçãoPerfil = zod_1.z.object({
    nome: zod_1.z.string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O nome deve ser uma string"
    })
        .min(3, { message: "O nome deve ter 2 ou mais caracteres" })
        .max(40, { message: "O nome deve ter 40 ou menos caracteres" })
        .optional(),
    email: zod_1.z.string({
        required_error: "O email é obrigatório",
        invalid_type_error: "O email deve ser uma string"
    }).email({ message: "Endereço de email invalido" })
        .optional(),
    palavraPasse: zod_1.z.string({
        required_error: "A palavra passe é obrigatória",
        invalid_type_error: "A palavra passe deve ser uma string"
    }).
        min(4, { message: "A palavra passe deve ter 2 ou mais caracteres" }).
        max(100, { message: "A palavra passe deve ter 70 ou menos caracteres" })
        .optional(),
    palavraPasseAntiga: zod_1.z.string({
        required_error: "A palavra passe é obrigatória",
        invalid_type_error: "A palavra passe deve ser uma string"
    }).
        min(4, { message: "A palavra passe deve ter 2 ou mais caracteres" }).
        max(100, { message: "A palavra passe deve ter 70 ou menos caracteres" })
        .optional(),
    dataNascimento: zod_1.z.date({
        required_error: "Selecione uma data",
        invalid_type_error: "A data deve ser uma Data"
    })
        .min(new Date("1925-01-01"), { message: "Idade inválida. Velho demais" })
        .max(new Date("2023-12-31"), { message: "Idade inválida. Muito jovem!" })
        .optional(),
    localizacao: zod_1.z.string({
        required_error: "O endereço é obrigatório",
        invalid_type_error: "O endereço deve ser uma string"
    })
        .min(3, { message: "O endereço deve ter 15 ou mais caracteres" })
        .max(60, { message: "O endereço deve ter 60 ou menos caracteres" })
        .optional(),
    telefone: zod_1.z.number({
        required_error: "O número de telefone é obrigatório",
        invalid_type_error: "O número de telefone deve ser uma string"
    }).min(100000000).max(999999999)
        .optional(),
    iban: zod_1.z.string({
        required_error: "O IBAN é obrigatório",
        invalid_type_error: "O IBAN deve ser uma string"
    })
        .min(25, { message: "O IBAN deve ter 10 ou mais caracteres" })
        .max(40, { message: "O IBAN deve ter 40 ou menos caracteres" }).optional(),
});
// * Esquemas const com o Omit para cada usuário
exports.AdminTypeOmit = exports.UtilizadorSchema.omit({
    id: true,
    localizacao: true,
    telefone: true,
    palavraPasseAntiga: true,
    dataNascimento: true,
    nome: true
});
exports.AdminTypeAtualizarInfo = exports.UtilizadorSchema.omit({ id: true, palavraPasse: true, localizacao: true, telefone: true });
exports.AdminAtualizarPalavraPasseOmit = exports.UtilizadorSchema.omit({
    id: true, localizacao: true, telefone: true, email: true,
    palavraPasse: true, palavraPasseAntiga: true
});
exports.ParticipanteOmit = exports.UtilizadorSchema.omit({ id: true, palavraPasseAntiga: true });
exports.ParticipanteOmitAtualizarInformacao = exports.UtilizadorSchema.omit({ id: true, palavraPasse: true, palavraPasseAntiga: true, email: true });
exports.OrganizadorOmitAtualizarInformacao = exports.UtilizadorSchema.omit({ id: true, palavraPasse: true, palavraPasseAntiga: true, email: true });
exports.UtilizadorOmitAtualizarPalavaraPasse = exports.UtilizadorSchema.omit({
    id: true, dataNascimento: true, email: true, localizacao: true, nome: true, telefone: true
});
exports.OrganizadorOmit = exports.UtilizadorSchema.omit({ id: true, palavraPasseAntiga: true });
// * Esquema const com o Omit para evento
exports.EventoOmit = exports.EventoSchema.omit({ id: true });
// * Esquema const com o Omit para categoria
exports.CategoriaOmit = exports.CategoriaSchema.omit({ id: true });
// * Esquema const com o Omit para TipoBilhete
exports.TipoBilheteOmit = exports.TipoBilheteSchema.omit({ id: true });
// * Esquema const com o Omit para Palestrante
exports.PalestranteOmit = exports.PalestranteSchema.omit({ id: true });
// * Esquema const Omit para Bilhete
exports.BilheteOmit = exports.BilheteSchema.omit({ id: true });
// * Esquema const Omit para Compra
exports.ReservaOmit = exports.ReservaSchema.omit({ id: true });
// * Esquema const Omit para Orador
exports.OradorOmit = exports.OradorSchema.omit({ id: true });
