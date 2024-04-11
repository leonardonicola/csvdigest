import fastify from 'fastify';
import router from './router';
import { fastifyMultipart } from '@fastify/multipart';
const server = fastify({
	logger: !!(process.env.NODE_ENV !== 'development'),
});

server.register(fastifyMultipart);
server.register(router);

export default server;
