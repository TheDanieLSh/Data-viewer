import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { xml2js } from "https://deno.land/x/xml2js@1.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const router = new Router();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());


router.get('/', (context) => {
    context.response.body = 'Successfull response from server!'
});

router.post('/file_process', async (context) => {
    console.log('Got a file process request');

    const link = await context.request.body.text();
    
    let outputFile;

    let isXML = false;

    await fetch(link).then(resp => {
        console.log('Start fetching data');

        if (resp.headers.get('content-type').includes('application/json')) {

            return resp.json();

        } else if (resp.headers.get('content-type').includes('text/xml')) {

            isXML = true;
            return resp.text();

        } else console.log('Unsupported type of the file');
    }).then(result => {
        console.log('Server received data');

        if (isXML) {
            console.log('Parsing XML to JSON');

            const json = xmlJsonPrettify(xml2js(result, { compact: true }));
            outputFile = JSON.stringify(json, null, '\t');

        } else outputFile = result

        console.log('Result is ready');
    });

    if (!outputFile) {
        context.response.body = 'Unsupported type of the file';
    } else {
        context.response.body = outputFile;
        
        console.log('Sending the result to client');
    }

    console.log('----');
});


const HOST = 'localhost';
const PORT = 4090;

console.log('Deno server is running at ' + HOST + ':' + PORT);

await app.listen({ hostname: HOST, port: PORT });


function xmlJsonPrettify(json) {
    for (const field in json) {
        json[field] = recursion(json[field]);
    }

    return json;

    function recursion(field) {
        if (typeof field === 'object' && field !== null) {
            if (field.hasOwnProperty('_text') && Object.keys(field).length === 1)
                return field._text;
            
            for (const key in field) {
                field[key] = recursion(field[key]);
            }
        }
        
        return field;
    }
}
