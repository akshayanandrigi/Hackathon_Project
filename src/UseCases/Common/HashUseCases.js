exports.hashTheOTPContents = async (hashService,phoneNumber,otp,expire) => {
    try{
        expire = 1000 * 60 * expire;

        const expireDateTime =await Date.now() + expire;
        const data = await `${phoneNumber}.${otp}.${expireDateTime}`;
        const hasedOTPContents = await hashService.hashData(data);

        return hasedOTPContents+`.${expireDateTime}`;
    }
    catch(err){
        return err;
    }
}

exports.checkForHashedOTPMatch = async (hashService,hashedOtp,phoneNumber,otp,expire) => {
    try{

        const data = `${phoneNumber}.${otp}.${expire}`;
        const hasedOTPContents =await hashService.hashData(data);
        console.log(hasedOTPContents, hasedOTPContents)
        return hasedOTPContents === hashedOtp;
    }
    catch(err){
        return err;
    }
}