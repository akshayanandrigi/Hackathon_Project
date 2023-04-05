// External Dependancies
const boom = require("boom");

const {
  LoginUserAndGenerateToken,
} = require("../../../Configs/Auth/user/UserAuth");

//User Repository
const UserModalRepository = require("../../../Modals/User/User/userModalRepository");

//models
const User = require("../../../Modals/User/User/usersModal");

//services
const SMSService = require("../../../Services/SmsService");
const HashService = require("../../../Services/HashService");

//usecases
const { findAUser, saveAUser } = require("../../../UseCases/user/userUseCases");
const { hashTheOTPContents, checkForHashedOTPMatch } = require("../../../UseCases/Common/HashUseCases");
const { OTP_EXPIRE_TIME_IN_MINS } = require("../../../Configs/Config");


exports.getUserDetails = async (take, give) => {
  try {
    const UserModalRepositoryStorage = new UserModalRepository();
    const foundUser = await findAUser(UserModalRepositoryStorage,take.user.userId);
    return foundUser;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.signUpUser = async (take, give) => {
  try {

    const newUser = {
      first_name: take.body.firstName,
      last_name: take.body.lastName,
      email: take.body.eMail,
      phone_number: take.body.phoneNumber,
      profile_picture: take.body.profilePicture,
      password: take.body.passWord,
    };
    
    const UserModalRepositoryStorage = new UserModalRepository();

    const savedUser = await saveAUser(UserModalRepositoryStorage, newUser);

    return { savedUser, status: true };
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.loginUser = async (take, give) => {
  try {
    const { phone, eMail, passWord } = take?.body;
    const findUser = await User.findOne({ email: eMail });
    if (Object.keys(findUser || {}).length > 0) {
      if (passWord == findUser.password) {
        const token = await LoginUserAndGenerateToken({ userId: findUser._id });
        return { token, user: findUser };
      }
    } else {
      return { message: "please check you are using valid email or password" };
    }
    return { message: "something went wrong" };
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.generateNewTokenAfterTokenExpiresexports = async (take, give) => {
  try {
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.updateUserProfilePicture = async (take, give) => {
  try {
    const searchedAndUpdatedUserProfileImage = await User.findOneAndUpdate(
      { _id: take.user.userId },
      { profile_picture: take.body.profilePicture }
    );
    return { status: true , message:"succusfully updated the picture"};
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.sendAnOTPForUser = async (take, give) => {
  try {
    const { phoneNumber } = take.body;
    const findUserByNumber = await User.findOne({ phone_number: phoneNumber.toString() });

    const smsServiceRef = new SMSService();
    const hashServiceRef = new HashService();

    const otp = await hashServiceRef.genrateOTP();
    const hashedOTPContents = await hashTheOTPContents(hashServiceRef, phoneNumber, otp, OTP_EXPIRE_TIME_IN_MINS);
    console.log(findUserByNumber,otp,hashedOTPContents)
    if(findUserByNumber){
       const sendAnOTPToUser = await smsServiceRef.sendAMessage(`+91${phoneNumber}`,`your OTP for Travel Tales is ${otp}`);

       if(sendAnOTPToUser)
       { return { status:true, ginger:hashedOTPContents } }
       else
       { 
         return { status:false }
       }
    }
    else{
      return { status:false }
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.verifyAnOTPForUser = async (take, give) => {
  try {
    const {otp, ginger, phoneNumber} = take.body;
    const [h_otp, expires] = ginger.split('.');

    const hashServiceRef = new HashService();

    if(Date.now() > expires)
    {
      return {message:"OTP expired"}
    }

    const verifedOTP = await checkForHashedOTPMatch(hashServiceRef, h_otp, phoneNumber, otp, expires);

    if(verifedOTP){
        const findUserByNumber = await User.findOne({ phone_number: phoneNumber.toString() });
        const token = await LoginUserAndGenerateToken({ userId: findUserByNumber._id });
        return { token, user: findUserByNumber };
    }
    else
    {
      return {message : "invalid OTP"};
    }

  } catch (err) {
    throw boom.boomify(err);
  }
};