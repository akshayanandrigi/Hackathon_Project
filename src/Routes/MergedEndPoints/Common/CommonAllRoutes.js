const FileUploadRoutes = require("../../../Routes/Common/fileUploadRoutes");

exports.commonAllRoutes = (fastify) => {
    
    FileUploadRoutes.forEach((route) => {
        fastify.route(route)
       })

}