import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());


router.get('/', (context) => {
    context.response.body = 'Successfull response from server!'
})


app.listen({ port: 4090 });
