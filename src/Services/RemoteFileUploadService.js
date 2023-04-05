const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dhyzxtjbm', 
    api_key: '675373669752759', 
    api_secret: '_pqZTVW2LPU8jEY65RH8pqlKdYc',
    secure: false
  });

const RemoteFileUploadService = class RemoteFileUploadService {
   
    async uploadToCloud(path){

        const options = { transformation: [
            { width: 250, height: 250, gravity: 'faces', crop: 'thumb' }
            ],
            folder: "profile"
        }

        try{
          let uploadedRes = await cloudinary.uploader.upload(path,options);
          return uploadedRes.secure_url;
        }
        catch(err){
            return false;
        }
    }

  };

module.exports = RemoteFileUploadService;