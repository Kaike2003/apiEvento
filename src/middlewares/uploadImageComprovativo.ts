import multer from "multer"

const storage = multer.diskStorage({

    filename: (req, file, cb) => {

        const nome = new Date().getTime() + file.originalname
        cb(null, nome)

    },
    destination: (req, file, cb) => {
        cb(null, "./public/upload/comprovativo")
    },

})


export const adicionarComprovativoUpload = multer({ storage })
