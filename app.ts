import router from './src/server/routes/base.routes.ts';

Deno.serve({
	'automaticCompression': true,
	'hostname': '0.0.0.0',
	'port': Number.parseInt(Deno.env.get('DENO_PORT') ?? ''),
}, (request: Request) => router(request, {}));
