import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());


router.get('/', (context) => {
    context.response.body = 'Successfull response from server!'
});

router.post('/file_process', async (context) => {
    const body = context.request.body({ 'type': 'text' });
    // const link = await body.value;
    console.log(body);
})

const HOST = 'localhost';
const PORT = 4090;

console.log('Deno server is running at ' + HOST + ':' + PORT);

await app.listen({ hostname: HOST, port: PORT });
