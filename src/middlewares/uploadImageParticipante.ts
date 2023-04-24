import multer from "multer"

const storage = multer.diskStorage({

    filename: (req, file, cb) => {

        const nome = new Date().getTime() + file.originalname
        cb(null, nome)

    },
    destination: (req, file, cb) => {
        cb(null, "./public/upload/usuarios/participante")
    },

})


export const aciicionarParticipanteUpload = multer({ storage })
