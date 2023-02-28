import express, { Response, Request } from "express"
import morgan from "morgan"
import { routerAdmin } from "../routes/admin"
import { routerOrganizador } from "../routes/organizador"
import { routerParticipante } from "../routes/participante"
const server = express()

server.use("/public", express.static("public"))

server.use(morgan("dev"))
server.use(express.json())


server.use("/admin", routerAdmin)
server.use("/participante", routerParticipante)
server.use("/organizador", routerOrganizador)


server.get("/", (req: Request, res: Response) => {
    res.send("Olá mundo")
})


export { server }