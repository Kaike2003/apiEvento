"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AprovarPagamento = void 0;
const prisma_1 = require("../../../prisma");
const qrcode_1 = __importDefault(require("qrcode"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const AprovarPagamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUtilizador, idCompra } = req.params;
    try {
        const verificarReserva = yield prisma_1.prisma.compra.findFirst({
            where: {
                id: idCompra,
                utilizadorId: idUtilizador
            }
        }).then((sucessoCompra) => __awaiter(void 0, void 0, void 0, function* () {
            if (!sucessoCompra) {
                res.status(400).json({ "O valor da reserva não pode ser nulo": sucessoCompra });
            }
            else {
                if (sucessoCompra.foto === null) {
                    res.status(400).json("Compra sem comprovativo");
                }
                else {
                    const aprovarPagamento = yield prisma_1.prisma.compra.update({
                        where: {
                            id: sucessoCompra === null || sucessoCompra === void 0 ? void 0 : sucessoCompra.id
                        },
                        data: {
                            pagamento: true
                        }
                    }).then((sucessoPagamento) => __awaiter(void 0, void 0, void 0, function* () {
                        const data = {
                            idCompra: sucessoPagamento.id,
                            idUtilizador: sucessoPagamento.utilizadorId
                        };
                        const dataString = JSON.stringify(data);
                        qrcode_1.default.toFile(`./public/upload/codigoQr/${sucessoPagamento.id}.png`, dataString).then((url) => __awaiter(void 0, void 0, void 0, function* () {
                            console.log("Url", url);
                            const verificarUtilizador = yield prisma_1.prisma.utilizador.findUnique({
                                where: {
                                    id: idUtilizador
                                }
                            }).then((sucessoUtilizador) => __awaiter(void 0, void 0, void 0, function* () {
                                if (!sucessoUtilizador) {
                                    res.status(400).json("Valor nulo");
                                }
                                else {
                                    let transporter = nodemailer_1.default.createTransport({
                                        host: "smtp.gmail.com",
                                        port: 587,
                                        secure: false,
                                        auth: {
                                            user: "kaikebartolomeu2003@gmail.com",
                                            pass: "ubgpkcctmxmpvlav"
                                        }
                                    });
                                    let mailOptions = {
                                        from: `${sucessoUtilizador.email}
                                        <kaikebartolomeu2003@gmail.com>`,
                                        to: `${sucessoUtilizador.email}`,
                                        subject: "Código Qr",
                                        text: "Utilize o Código Qr para poderes ter acesso ao evento disponível pela sua compra de bilhete.",
                                        html: '<h2>Utilize o Código Qr para poderes ter acesso ao evento disponível pela sua compra de bilhete.</h2>: <img src="cid:unique@kreata.ee"/>',
                                        attachments: [{
                                                filename: 'image.png',
                                                path: `http://localhost:3456/public/upload/codigoQr/${sucessoCompra.id}.png`,
                                                cid: 'unique@kreata.ee' //same cid value as in the html img src
                                            }]
                                    };
                                    // transporter.sendMail({
                                    //     from: `${sucessoUtilizador.email}
                                    //         <kaikebartolomeu2003@gmail.com>` ,
                                    //     to: `${sucessoUtilizador.email}`,
                                    //     subject: "Código qr",
                                    //     text: "",
                                    //     html: `
                                    //         Foto: http://localhost:3456/public/upload/codigoQr/${sucessoCompra.id}.png
                                    //         <img src="http://localhost:3456/public/upload/codigoQr/04a25202-3064-4396-8a3d-20c9931ac03e.png" alt="codigo" />
                                    //                 `
                                    // }).then(message => {
                                    //     console.log({ "Valido": message })
                                    //     res.status(201).json(sucessoUtilizador)
                                    // }).catch(error => {
                                    //     console.log({ "Errado": error })
                                    // })
                                    transporter.sendMail(mailOptions).then(message => {
                                        console.log({ "Valido": message });
                                        res.status(201).json(sucessoUtilizador);
                                    }).catch(error => {
                                        console.log({ "Errado": error });
                                    });
                                }
                            })).catch(error => {
                                res.status(400).json(error);
                                console.log("Error", error);
                            });
                        })).catch(error => {
                            console.log("Error", error);
                        });
                    })).catch((error) => {
                        console.log("Error", error);
                        res.status(400).json(error);
                    });
                }
            }
        })).catch((error) => {
            res.status(400).json(error);
            console.log("Error", error);
        });
    }
    catch (error) {
        res.status(400).json(error);
        console.log("Error", error);
    }
});
exports.AprovarPagamento = AprovarPagamento;
