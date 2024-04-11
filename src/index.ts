import cluster from 'cluster';
import server from './server';
import os from 'os';

const runPrimaryProcess = () => {
	const processesCount = os.cpus().length;
	console.log(`PRIMARY: ${process.pid}`);
	console.log(`\n FORKING WITH ${processesCount}`);

	for (let i = 0; i < processesCount; i++) cluster.fork();

	cluster.on('exit', (worker, code) => {
		if (code !== 0 && !worker.exitedAfterDisconnect) {
			console.log(`WORKER ${worker.process.pid} DIED. FORKING ANOTHER`);
			cluster.fork();
		}
	});
};

const runWorkerProcess = async () => {
	const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

	server.listen({ port: FASTIFY_PORT }, (err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});
};

// Se for o processo master, faça novos workers
cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
