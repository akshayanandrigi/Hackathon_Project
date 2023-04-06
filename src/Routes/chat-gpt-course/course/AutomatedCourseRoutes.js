const {generateVideoFromText,getVideoFromElai,fetchRenderingStatus} = require("../../../Controller/Course/AutomatedCourseController")

const routes = [
    {
        method: "POST",
        url: "/api/create-course-from-text",
        handler: generateVideoFromText,
    },
    {
        method:"GET",
        url: "/api/video-status/:id",
        handler: getVideoFromElai,
    },
];

module.exports = routes;