
const SmsService = class SmsService {
   
   async sendAMessage(number, text){
       try{
            const accountSid = process.env.SMS_SERVICE_ACCOUNT_SID; 
            const authToken = process.env.SMS_SERVICE_ACCOUNT_TOKEN; 
            console.log(accountSid,authToken,"creds")

//           return false;
          
            const client = await require('twilio')(accountSid, authToken, {
                lazyLoading: true
            }); 

        const sentSms = await client.messages 
            .create({ 
                body: text,  
                messagingServiceSid: process.env.SMS_SERVICE_ACCOUNT_MESSAGE_SID,      
                to: number 
            })
        console.log(sentSms)
        return true;
        }
        catch(err){
            console.log(err);
        }
    }

  };

//   const smsSend = new SmsService();
//   smsSend.sendAMessage();

module.exports =  SmsService;
