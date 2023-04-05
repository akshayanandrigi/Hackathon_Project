// External Dependancies
const boom = require('boom')

const fs = require('fs')
const { promisify } = require('util')

const RemoteUploadService = require("../../Services/RemoteFileUploadService");

const unlinkAsync = promisify(fs.unlink)

//file.fields.nww.value
exports.uploadSingleFile = async (take, give) => {
    try {
        //let file = await take.file();
       // let uploaded = await upload.single("files");
        let RemoteUploadServiceRef = new RemoteUploadService();

        const url = await RemoteUploadServiceRef.uploadToCloud(take.file.path)
        console.log(take.file,"hello")
        await setTimeout(async() => {await unlinkAsync(take.file.path)}, 50000 ) 
        return {path:url,old_path:take.file.path};
    } catch (err) {
      throw boom.boomify(err);
    }
  };