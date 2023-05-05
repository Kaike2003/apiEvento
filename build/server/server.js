"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const admin_1 = require("../routes/admin");
const organizador_1 = require("../routes/organizador");
const participante_1 = require("../routes/participante");
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
exports.server = server;
server.use("/public", express_1.default.static("public"));
server.use((0, cors_1.default)());
server.use((0, morgan_1.default)("dev"));
server.use(express_1.default.json());
server.use("/admin", admin_1.routerAdmin);
server.use("/participante", participante_1.routerParticipante);
server.use("/organizador", organizador_1.routerOrganizador);
server.get("/", (req, res) => {
    res.send("<h1>Página principal funcionando</h1>");
});
