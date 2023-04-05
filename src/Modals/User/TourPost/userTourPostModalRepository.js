const { MainClass } = require("../../MainClass/MainClass");
const userTourPostModal = require("./userTourPostModal")
const userTourPostModalRepository = class userTourPostModalRepository extends MainClass{
    constructor() {
     super(userTourPostModal);
      this.model = userTourPostModal
    }
  };

module.exports =  userTourPostModalRepository;