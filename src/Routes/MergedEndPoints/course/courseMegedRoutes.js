const AutomatedCourseRoutes = require("../../../Routes/chat-gpt-course/course/AutomatedCourseRoutes");
const AutomatedCourseWebHookRoutes = require("../../../Routes/chat-gpt-course/web-hook/automatedCourseWebhookRoutes")

exports.AutomatedAllCourseRoutes = (fastify) => {

    AutomatedCourseRoutes.forEach((route) => {
        fastify.route(route)
    })

    AutomatedCourseWebHookRoutes.forEach((route) => {
        fastify.route(route)
    })

}