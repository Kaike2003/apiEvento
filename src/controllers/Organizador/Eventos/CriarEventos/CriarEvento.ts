import { Request, Response } from "express";
import { string } from "zod";
import { prisma } from "../../../../prisma";
import { EventoType, EventoOmit, Hora_Data_Validacao, Validacao, VerificaoExiste_Evento, } from "../../../../validation";

export const CriarEvento = async (req: Request, res: Response) => {

    const { id } = req.params
    const idUtilizador: string = String(id)

    const {
        nome,
        descricao,
        dataInicio,
        dataTermino,
        horaInicio,
        horaTermino,
        foto,
        provincia,
        municipio,
        bairro,
        categoriaId
    }: EventoType = req.body

    const result = EventoOmit.parse({
        nome: nome,
        descricao: descricao,
        dataInicio: new Date(dataInicio),
        dataTermino: new Date(dataTermino),
        horaInicio: new Date(`${dataInicio} ${horaInicio}`),
        horaTermino: new Date(`${dataTermino} ${horaTermino}`),
        foto: "image.png",
        provincia: provincia,
        municipio: municipio,
        bairro: bairro,
        categoriaId: categoriaId
    })

    const hora_Validacao: Hora_Data_Validacao = {
        horaInicio: new Date(`${dataInicio} ${"00:00:00"}`).getHours(),
        horaTermino: new Date(`${dataInicio} ${"23:00:00"}`).getHours()
    }

    try {

        const verificarUtilizadorExiste = await prisma.utilizador.findFirst({
            where: {
                id: idUtilizador
            }
        })

        if (
            verificarUtilizadorExiste?.id === idUtilizador
            &&
            verificarUtilizadorExiste?.utilizador === "ORGANIZADOR"
            &&
            result.dataInicio.getDate() === result.dataTermino.getDate()
            &&
            result.dataInicio.getMonth() === result.dataTermino.getMonth()
            &&
            hora_Validacao.horaInicio <= result.horaInicio.getHours()
            &&
            hora_Validacao.horaTermino >= result.horaTermino.getHours()
            && hora_Validacao.horaInicio <= result.horaTermino.getHours()
            &&
            result.horaInicio.getHours() <= result.horaTermino.getHours()
        ) {

            const criarEvento: void = await prisma.evento.create({
                data: {
                    nome: result.nome,
                    descricao: result.descricao,
                    dataInicio: result.dataInicio,
                    dataTermino: result.dataTermino,
                    estado: "DESPONIVEL",
                    horaInicio: result.horaInicio,
                    horaTermino: result.horaTermino,
                    provincia: result.provincia,
                    municipio: result.municipio,
                    bairro: bairro,
                    banido: false,
                    publicado: false,
                    aprovado: false,
                    foto: "imagem",
                    utilizadorId: idUtilizador,
                    categoriaId: categoriaId
                }
            }).then((sucesso) => {
                res.json(sucesso)
            }).catch((error) => {
                res.json(error)
            })

        } else {
            res.json({
                "Possiveis erros": {
                    "UtilizadorId": "Verifique o id do utilizador para saber se é um administrador, organizador ou participante.",
                    "Organizador": "Essa conta não é de organizador. Não pode criar evento",
                    "Data de inicio e termino": "A Data de inicio e termino de um evento não devem ser iguais",
                    "Data de inicio": result.dataInicio,
                    "Data de termino": result.dataTermino,
                    "Hora de crição de evento errada. Pode conferir aqui as horas válidas para criação de um evento":
                    {

                        "hora validação": {
                            "hora validação inicio": new Date(`${dataInicio} ${"00:00:00"}`).getHours(),
                            "hora valicação termino": new Date(`${dataInicio} ${"23:00:00"}`).getHours()
                        },

                        "hora do evento": {
                            "hora inicio": result.horaInicio.getHours(),
                            "hora termino ": result.horaTermino.getHours()
                        }

                    }

                }
            })
        }

    } catch (error) {
        res.json({ "Erro criar evento": error })
    }




}
