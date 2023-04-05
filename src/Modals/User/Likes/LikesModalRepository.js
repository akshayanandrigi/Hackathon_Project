const { MainClass } = require("../../MainClass/MainClass");
const likesTourPostModal = require("./LikesModal");

const userLikesTourPostModalRepository = class userTourPostModalRepository extends MainClass{
    constructor() {
     super(likesTourPostModal);
      this.model = likesTourPostModal
    }
  };

module.exports =  userLikesTourPostModalRepository;