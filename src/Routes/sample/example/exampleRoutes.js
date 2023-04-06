// Import our Controllers
const { verifyTheUserToken } = require("../../../Configs/Auth/user/UserAuth");
const carController = require("../../../Controller/sample/example/exampleController");

//https://www.fastify.io/docs/latest/Reference/Routes/
const routes = [
  {
    method: "POST",
    url: "/api/video_cut",
    handler: carController.cutVideo
  },
  {
    method: "GET",
    url: "/api/cars",
    // schema: {
    //   response: {
    //     200: {
    //       type: "array",
    //       items: {
    //         type: "object",
    //         properties: {
    //           title: { type: "string" },
    //           age: { type: "integer" },
    //           brand: { type: "string" },
    //           services: {
    //             type: "object",
    //             properties: {
    //               date: { type: "string" },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    handler: carController.getCars,
  },
  {
    method: "GET",
    url: "/api/cars/:id",
    handler: carController.getSingleCar,
  },
  {
    method: "POST",
    url: "/api/cars",
    // preHandler: verifyTheUserToken,
    handler: carController.addCar,
  },
  {
    method: "PUT",
    url: "/api/cars/:id",
    handler: carController.updateCar,
  },
  {
    method: "DELETE",
    url: "/api/cars/:id",
    handler: carController.deleteCar,
  },
];

module.exports = routes;
