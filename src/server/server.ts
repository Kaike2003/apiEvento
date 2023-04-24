import express, { Response, Request } from "express"
import morgan from "morgan"
import { routerAdmin } from "../routes/admin"
import { routerOrganizador } from "../routes/organizador"
import { routerParticipante } from "../routes/participante"
import nodeSchedule from "node-schedule"

import cors from "cors"
const server = express()


server.use("/public", express.static("public"))

server.use(cors())
server.use(morgan("dev"))
server.use(express.json())



server.use("/admin", routerAdmin)
server.use("/participante", routerParticipante)
server.use("/organizador", routerOrganizador)


server.get("/", (req: Request, res: Response) => {
    res.send("<h1>Página principal funcionando</h1>")
})




export { server }