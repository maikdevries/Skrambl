import router from './src/server/routes/base.routes.ts';

Deno.serve({
	'port': Number.parseInt(Deno.env.get('DENO_PORT') ?? ''),
}, async (request: Request) => await router(request, {}));
