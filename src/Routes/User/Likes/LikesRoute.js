const { verifyTheUserToken } = require("../../../Configs/Auth/user/UserAuth");
const LikesTourPostController = require("../../../Controller/User/TourPostLikes/TourPostLikesController");

const routes = [
  {
    method: "GET",
    url: "/api/tour-post-like/:post_id",
    preHandler:verifyTheUserToken,
    handler: LikesTourPostController.getLikesOfPosts,
  },
  {
    method: "POST",
    url: "/api/tour-post-like/:post_id",
    preHandler:verifyTheUserToken,
    handler: LikesTourPostController.saveLikeForAPost,
  },
];

module.exports = routes;
