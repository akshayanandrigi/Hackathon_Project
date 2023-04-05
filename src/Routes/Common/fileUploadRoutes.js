const { verifyTheUserToken } = require("../../Configs/Auth/user/UserAuth");
const FileUploadController = require("../../Controller/Common/fileUploadController");
const multer = require("fastify-multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }, 
  })

const upload = multer({storage: storage, limits:{fileSize:1000000 * 5}});

const routes = [
  {
    method: "POST",
    url: "/api/upload-single-file",
    preHandler:[verifyTheUserToken,upload.single('files')],
    handler: FileUploadController.uploadSingleFile
  },
];

module.exports = routes;
