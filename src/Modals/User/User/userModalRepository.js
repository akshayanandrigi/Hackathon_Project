const { MainClass } = require("../../MainClass/MainClass");
const userModal = require("./usersModal")
const UserModalRepository = class UserModalRepository extends MainClass{
    constructor() {
     super(userModal);
      this.model = userModal
    }
  };

module.exports =  UserModalRepository;