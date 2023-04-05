const { verifyTheUserToken } = require("../../../Configs/Auth/user/UserAuth");
const UserAuthController = require("../../../Controller/User/Auth/AuthController");
const { LoginResponseSchema } = require("./AuthValidationSchema");

const routes = [
  {
    method: "GET",
    url: "/api/user",
    preHandler: verifyTheUserToken,
    handler: UserAuthController.getUserDetails,
  },
  {
    method: "POST",
    url: "/api/signup",
    handler: UserAuthController.signUpUser,
  },
  {
    method: "POST",
    url: "/api/login",
    // schema: { response: LoginResponseSchema },
    handler: UserAuthController.loginUser,
  },
  {
    method: "POST",
    url: "/api/token",
    handler: UserAuthController.generateNewTokenAfterTokenExpiresexports,
  },
  {
    method: "PATCH",
    url: "/api/update-profile-image",
    preHandler: [verifyTheUserToken], 
    handler: UserAuthController.updateUserProfilePicture,
  },
  {
    method: "POST",
    url: "/api/send-otp",
    handler: UserAuthController.sendAnOTPForUser,
  },
  {
    method: "POST",
    url: "/api/verify-otp",
    handler: UserAuthController.verifyAnOTPForUser,
  }
];

module.exports = routes;
