const jsonWebToken = require("jsonwebtoken");

exports.LoginUserAndGenerateToken = async (payload) => {
  const token = jsonWebToken.sign(payload, "secrate", {
    algorithm: "HS256",
    expiresIn: "800h",
  });
  return token;
};

exports.verifyTheUserToken = async (req,res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jsonWebToken.verify(token, 'secrate');
        req.user = decoded;
      } catch(err) {
        res.status(400).send({message:"Invalid Token"})
      }
}