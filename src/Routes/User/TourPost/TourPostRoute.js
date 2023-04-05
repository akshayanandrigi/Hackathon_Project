const { verifyTheUserToken } = require("../../../Configs/Auth/user/UserAuth");
const TourPostController = require("../../../Controller/User/TourPost/TourPostController");

const routes = [
  {
    method: "GET",
    url: "/api/tour-planned-post",
    preHandler:verifyTheUserToken,
    handler: TourPostController.getUserTourPost,
  },
  {
    method: "POST",
    url: "/api/tour-planned-post",
    preHandler:verifyTheUserToken,
    handler: TourPostController.saveTheUserTourPost,
  },
  {
    method: "PATCH",
    url: "/api/tour-planned-post",
    preHandler:verifyTheUserToken,
    handler: TourPostController.saveTheUserTourPost,
  },
  {
    method: "DELETE",
    url: "/api/tour-planned-post",
    preHandler:verifyTheUserToken,
    handler: TourPostController.saveTheUserTourPost,
  }
];

module.exports = routes;
