const fp = require('fastify-plugin');
const fastifyStatic = require("@fastify/static");

async function customFastifyStatic(fastify, opts, next) {
  fastify.register(fastifyStatic,{})
  fastify.decorate('authenticate', async function (request, reply) {
    try {
        console.log("static library");
    } catch (err) {
      reply.send(err)
    }
  })
}

module.exports = fp(customFastifyStatic,{fastify:"3.0.0"})