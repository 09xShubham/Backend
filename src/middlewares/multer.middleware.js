import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
  
export const upload = multer({ 
    storage, 
})


// Multer is used to upload files to the server. It is a middleware that is used to handle multipart/form-data. It is used to upload files to server.