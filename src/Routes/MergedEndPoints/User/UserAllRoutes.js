const UserAuthRoutes = require("../../User/Auth/AuthRoutes");
const UserTourPostRoutes = require("../../User/TourPost/TourPostRoute");
const LikesTourPostRoutes = require("../../User/Likes/LikesRoute");
const CarRoutes = require("../../sample/example/exampleRoutes")

exports.userAllRoutes = (fastify) => {
    
    UserAuthRoutes.forEach((route) => {
        fastify.route(route)
       })
    
    UserTourPostRoutes.forEach((route) => {
        fastify.route(route)
       })

    LikesTourPostRoutes.forEach((route) => {
        fastify.route(route)
       })

    CarRoutes.forEach((route) => {
        fastify.route(route)
       })
}