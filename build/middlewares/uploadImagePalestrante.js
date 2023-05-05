"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarFotoPalestranteUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: (req, file, cb) => {
        const nome = new Date().getTime() + file.originalname;
        cb(null, nome);
    },
    destination: (req, file, cb) => {
        cb(null, "./public/upload/palestrante");
    },
});
exports.adicionarFotoPalestranteUpload = (0, multer_1.default)({ storage });
