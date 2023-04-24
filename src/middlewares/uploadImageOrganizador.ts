import multer from "multer"

const storage = multer.diskStorage({

    filename: (req, file, cb) => {

        const nome = new Date().getTime() + file.originalname
        cb(null, nome)

    },
    destination: (req, file, cb) => {
        cb(null, "./public/upload/usuarios/organizador")
    },

})


export const aciicionarOrganizadorUpload = multer({ storage })
