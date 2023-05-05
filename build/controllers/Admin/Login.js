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
exports.Login = exports.SECRET = void 0;
const prisma_1 = require("../../prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = "kaikebartolomeu";
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, palavraPasse } = req.body;
    const usuario = yield prisma_1.prisma.utilizador.findUnique({ where: { email } });
    try {
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        const senhaCorreta = yield bcrypt_1.default.compare(palavraPasse, usuario.palavraPasse);
        if (!senhaCorreta) {
            throw new Error('Senha incorreta');
        }
        else {
            if (usuario.utilizador === "ADMIN" &&
                usuario.verificado === true) {
                const token = jsonwebtoken_1.default.sign({
                    userId: usuario.id,
                }, exports.SECRET, { expiresIn: "1d" });
                res.json({ autenticação: true, token, usuario });
                console.log(token);
            }
        }
    }
    catch (error) {
        res.status(400).json({ "Error": error, "Palavrapasse incorreta": palavraPasse });
    }
});
exports.Login = Login;
