// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
  });
const path = require('path');
const cluster = require('cluster');
const os = require('os');
console.log(os.cpus().length)
const toobusy = require('toobusy-js');

fastify.register(require('@fastify/multipart'),{ attachFieldsToBody: false })
fastify.register(require('@fastify/formbody'));


fastify.addHook('onRequest', (request, reply, done) => {
  console.log("pid", process.pid)
  if(toobusy()){
    reply.code(503).send({message:"I'm busy right now, sorry."});
  }
  else
  {
    done()
  }
})


const { registerCors } = require('./Configs/Cors/CorsConfig');
const { connectToMongo } = require('./Configs/database/connectMongo');
const swagger = require('./Configs/Documentation/Swagger');
const { commonAllRoutes } = require('./Routes/MergedEndPoints/Common/CommonAllRoutes');

const { userAllRoutes } = require('./Routes/MergedEndPoints/User/UserAllRoutes');

require("dotenv").config();

fastify.register(require("@fastify/swagger"), swagger.options);

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '../uploads'),
  prefix: '/uploads/',
})

registerCors(fastify);
// fastify.decorateRequest('fastify', fastify);
connectToMongo();

//common Routes
commonAllRoutes(fastify)

//Users Routes
userAllRoutes(fastify)

  // Run the server!
  const startServer = async () => {
    try {
      if(cluster.isMaster){
        for(let i=0; i < 2; i++){
          cluster.fork();
        }
      }
      else{
        await fastify.listen(2022,"0.0.0.0")
        fastify.log.info(`server listening on ${fastify.server.address().port} and process id ${process.pid}`)
      }
      
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

  startServer();
