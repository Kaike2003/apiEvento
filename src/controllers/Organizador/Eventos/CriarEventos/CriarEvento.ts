import { Request, Response } from "express";
import { string } from "zod";
import { prisma } from "../../../../prisma";
import { EventoType, EventoOmit, Hora_Data_Validacao, Validacao, VerificaoExiste_Evento, QueryParams, } from "../../../../validation";

export const CriarEvento = async (req: Request, res: Response) => {

    const { idUtilizador }: QueryParams = req.params

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

    console.log(nome,
        descricao,
        dataInicio,
        dataTermino,
        horaInicio,
        horaTermino,
        foto,
        provincia,
        municipio,
        bairro,
        categoriaId)

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
        
        ) {

            if (result.dataInicio.getDate() === result.dataTermino.getDate()
                &&
                result.dataInicio.getMonth() === result.dataTermino.getMonth()
            ) {

                if (
                    hora_Validacao.horaInicio <= result.horaInicio.getHours()
                    &&
                    hora_Validacao.horaTermino >= result.horaTermino.getHours()
                    && hora_Validacao.horaInicio <= result.horaTermino.getHours()
                    &&
                    result.horaInicio.getHours() <= result.horaTermino.getHours()
                ) {
                    console.log("Pode criar evento")
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
                            foto: "padrao.png",
                            utilizadorId: idUtilizador,
                            categoriaId: categoriaId,
                            visualizacao: 0
                        }
                    }).then((sucesso) => {
                        res.json(sucesso)
                    }).catch((error) => {
                        res.json(error)
                    })

                } else {
                    console.log("Verifique o horário do evento")
                    res.status(400).json("Verifique o horário do evento")
                }

            } else {
                res.status(400).json("A data de inicio e termino de ventos devem ser as mesmas.")
                console.log("A data de inicio e termino de ventos devem ser as mesmas.")
            }


        } else {
            res.json({
                "Possiveis erros": {
                    "UtilizadorId": "Verifique o id do utilizador para saber se é um administrador, organizador ou participante.",
                    "Organizador": "Essa conta não é de organizador. Não pode criar evento",
                    
                }
            })
        }

    } catch (error) {
        res.json({ "Erro criar evento": error })
    }




}
