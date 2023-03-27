import multer from "multer"


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
    const nome = new Date().getTime() + file.originalname
        cb(null, nome)
    },
    destination: (req, file, cb) => {
      const path = "./public/upload/evento"
        cb(null, "./public/upload/evento")
    },
})
export const upload = multer({storage})


