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
exports.PermissaoRotasParticipante = exports.PermissaoRotasOrganizador = exports.PermissaoRotasAdmin = void 0;
const prisma_1 = require("../prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login_1 = require("../controllers/Admin/Login");
// * Acesso restrito só para administradores.
const PermissaoRotasAdmin = (cargo) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json("Valor nulo");
        }
        else {
            const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer", "").trim();
            try {
                const data = jsonwebtoken_1.default.verify(token, Login_1.SECRET);
                const { userId } = data;
                // console.log(data)
                // console.log("Permitir routas id", req.userId = userId)
                const CARGO = yield prisma_1.prisma.utilizador.findFirst({
                    where: {
                        id: userId,
                    }
                });
                try {
                    if (!CARGO) {
                        res.json("O cargo não pode ser nulo.");
                    }
                    else {
                        if (CARGO.utilizador === cargo
                            && CARGO.id === userId) {
                            // console.log(`${cargo} tem acesso a todas rotas de ADMINISTRADOR`)
                            // res.json(`${cargo} tem acesso a todas rotas de ADMINISTRADOR`)
                            next();
                        }
                        else {
                            res.status(401).json("Acesso negado. Rota só para administradores.");
                        }
                    }
                }
                catch (error) {
                    res.json(error);
                }
            }
            catch (error) {
                res.json(error);
            }
        }
    });
};
exports.PermissaoRotasAdmin = PermissaoRotasAdmin;
// * Acesso restrito só para organizadores de evento.
const PermissaoRotasOrganizador = (cargo) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json("Valor nulo");
        }
        else {
            const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer", "").trim();
            try {
                const data = jsonwebtoken_1.default.verify(token, Login_1.SECRET);
                const { userId } = data;
                // console.log(data)
                // console.log("Permitir routas id", req.userId = userId)
                const CARGO = yield prisma_1.prisma.utilizador.findFirst({
                    where: {
                        id: userId,
                        utilizador: "ORGANIZADOR"
                    }
                });
                try {
                    if (!CARGO) {
                        res.json("O cargo não pode ser nulo.");
                    }
                    else {
                        console.log({
                            "Verificação": {
                                CargoId: CARGO.utilizador,
                                cargo: cargo
                            }
                        });
                        if (CARGO.utilizador === cargo
                            &&
                                CARGO.id === userId
                            &&
                                CARGO.utilizador === "ORGANIZADOR") {
                            console.log(`${cargo} tem acesso a todas rotas de ORGANIZADOR`);
                            // res.json(`${cargo} tem acesso a todas rotas de ORGANIZADOR`)
                            next();
                        }
                        else {
                            res.status(401).json({ "Acesso negado. Rota só para organizadores de evento.": cargo });
                        }
                    }
                }
                catch (error) {
                    res.json(error);
                }
            }
            catch (error) {
                res.json(error);
            }
        }
    });
};
exports.PermissaoRotasOrganizador = PermissaoRotasOrganizador;
// * Acesso restrito só para Participantes.
const PermissaoRotasParticipante = (cargo) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json("Valor nulo");
        }
        else {
            const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer", "").trim();
            try {
                const data = jsonwebtoken_1.default.verify(token, Login_1.SECRET);
                const { userId } = data;
                // console.log(data)
                // console.log("Permitir routas id", req.userId = userId)
                const CARGO = yield prisma_1.prisma.utilizador.findFirst({
                    where: {
                        id: userId,
                        utilizador: "PARTICIPANTE"
                    }
                });
                try {
                    if (!CARGO) {
                        res.json("O cargo não pode ser nulo.");
                    }
                    else {
                        if (CARGO.utilizador === cargo
                            &&
                                CARGO.id === userId
                            &&
                                CARGO.utilizador === "PARTICIPANTE") {
                            console.log(`${cargo} tem acesso a todas rotas de PARTICIPANTES`);
                            // res.json(`${cargo} tem acesso a todas rotas de PARTICIPANTES`)
                            next();
                        }
                        else {
                            res.status(401).json("Acesso negado. Rota só para participantes de evento.");
                        }
                    }
                }
                catch (error) {
                    res.json(error);
                }
            }
            catch (error) {
                res.json(error);
            }
        }
    });
};
exports.PermissaoRotasParticipante = PermissaoRotasParticipante;
