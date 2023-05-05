"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
server_1.server.listen(3456 /* Porta.porta */ || 3456, () => {
    console.log(`Servidor funcionando na porta ${3456 /* Porta.porta */}`);
});
