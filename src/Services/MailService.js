const nodemailer = require('nodemailer');

const MailService = class MailService {
   
    async sendAMail(recip_emails,subject,content){
        try{
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: process.env.MAIL_USER_EMAIL,
                   pass: process.env.MAIL_USER_PASSWORD
               }
           });

        const mailOptions = {
            from: process.env.MAIL_USER_EMAIL, // sender address
            to: recip_emails, // list of receivers
            subject: subject, // Subject line
            html: subject// plain text body
          };

         await transporter.sendMail(mailOptions)

         return true;
        }
        catch(err){
            return false;
        }
    }

  };

module.exports =  MailService;

