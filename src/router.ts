import { FastifyInstance } from 'fastify';
import indexController from './controller';

export default async function router(fastify: FastifyInstance) {
	fastify.register(indexController, { prefix: '/api/v1' });
}
