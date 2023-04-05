const crypto = require("crypto");

const HashService = class HashService {
   
    async genrateOTP(){
        const otp = crypto.randomInt(10000,99999);
        return otp;
    }

    async hashData(data){
        try{
            const hashedData = crypto.createHmac('sha256',process.env.HASH_SECREAT).update(data).digest('hex');
            return hashedData
         }
         catch(err){
             console.log(err);
         }
     }
 
   };
 
 module.exports =  HashService;