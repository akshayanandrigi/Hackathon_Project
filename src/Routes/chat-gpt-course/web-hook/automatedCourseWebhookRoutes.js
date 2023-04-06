const {testWebhook} = require("../../../Controller/webhook/automatedCourseWebhook")

const routes = [

    {
        method: "POST",
        url: "/api/test",
        handler: testWebhook,
    },
];

module.exports = routes;