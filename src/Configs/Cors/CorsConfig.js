
exports.registerCors = (fastify) => fastify.register((fastify, options, done) => {
    fastify.register(require("@fastify/cors"), {
      origin: "*",
      methods: "*"
    });
    done();
  });