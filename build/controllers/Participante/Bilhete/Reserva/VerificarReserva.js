"use strict";
// import { Request, Response } from "express";
// import nodeSchedule from "node-schedule"
// import { prisma } from "../../../../prisma";
// const rule = new nodeSchedule.RecurrenceRule()
// rule.date = new Date().getDate() + 1
// rule.hour = 23
// rule.minute = 59
// rule.second = 59
// rule.month = new Date().getMonth()
// const data = new Date(2023, 3, 15, 20, 50)
// const job = nodeSchedule.scheduleJob(rule, (fireDate) => {
//     (req: Request, res: Response) => {
//         prisma.reserva.findFirst({
//             where: {
//                 pagamento: false
//             }
//         }).then((sucesso) => {
//             try {
//                 if (!sucesso) {
//                     res.status(400).json("Valor nulo")
//                     console.log("Valor nulo")
//                 } else {
//                     if (sucesso.at_create.getDate() === fireDate.getDate()
//                         &&
//                         sucesso.at_create.getMonth() === fireDate.getMonth()
//                     ) {
//                         prisma.item_Bilhete.findFirst({
//                             where: {
//                                 id: sucesso.id,
//                             }
//                         }).then((sucessoItem_Bilhete) => {
//                             prisma.bilhete.update({
//                                 where: {
//                                     id: sucessoItem_Bilhete?.bilheteId
//                                 },
//                                 data: {
//                                     quantidade: Number(sucesso.quantidade)
//                                 }
//                             })
//                         })
//                     }
//                 }
//             } catch (error) {
//                 console.log(error)
//                 res.json(error)
//             }
//         })
//     }
//     console.log(job.nextInvocation())
// })
// console.log(job.nextInvocation())
// console.log(job.nextInvocation())
