import { Porta } from "./Port";
import { server } from "./server/server";

server.listen( Porta.porta || 3456 , ()=>{
    console.log(`Servidor funcionando na porta ${Porta.porta}`)
})

