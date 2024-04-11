import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import csvtojson from 'csvtojson';
import { pipeline } from 'stream/promises';
export default async function indexController(fastify: FastifyInstance) {
	// GET /
	fastify.post(
		'/',
		async function (request: FastifyRequest, reply: FastifyReply) {
			const data = await request.file();
			if (!data) {
				reply.send({ message: 'Erro ao encontrar CSV!' });
				return;
			}

			if (data.mimetype !== 'text/csv') {
				reply.send({ message: 'Arquivo inválido! Aceitamos apenas .csv!' });
				return;
			}

			const result: string[] = [];
			await pipeline(data.file, csvtojson(), async function* (source) {
				for await (const data of source) {
					result.push(data.toString());
				}
			});
			reply.send({ message: 'Concluido', resultado: result });
			return;
		},
	);
}
