"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autenticacao = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login_1 = require("../controllers/Admin/Login");
const Autenticacao = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json("Valor nulo");
    }
    else {
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer", "").trim();
        try {
            const data = jsonwebtoken_1.default.verify(token, Login_1.SECRET);
            const { userId, nome, email } = data;
            req.userId = userId;
            req.nome = nome,
                req.email = email;
            console.log(data);
            // console.log("User id", req.userId = userId)
            return next();
        }
        catch (error) {
            res.json(error);
        }
    }
};
exports.Autenticacao = Autenticacao;
