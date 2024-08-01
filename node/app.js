const express = require('express');
const xml2js = require('xml2js').parseString;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
    .use(cors())
    .use(bodyParser.text({ type: 'text/plain' }))
    .use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Successfull response from server!');
    res.end();
});

app.post('/file_process', async (req, res) => {
    console.log('Got a file process request');

    const link = await req.body;
    
    let outputFile;

    let isXML = false;

    await fetch(link).then(resp => {
        console.log('Start fetching data');

        if (resp.headers.get('content-type').includes('application/json')) {

            return resp.json();

        } else if (resp.headers.get('content-type').includes('text/xml')) {

            isXML = true;
            return resp;

        } else console.log('Unsupported type of the file');
    }).then(result => {
        console.log('Server received data');

        if (isXML) {
            console.log('Parsing XML to JSON');

            const json = xmlJsonPrettify(xml2js(result, { compact: true }));
            outputFile = JSON.stringify(json, null, '\t');

        } else outputFile = result;

        console.log('Result is ready');
    });

    if (!outputFile) {
        res.send('Unsupported type of the file');
    } else {
        res.send(outputFile);
        
        console.log('Sending the result to client');
    }

    res.end();

    console.log('----');
});


const HOST = 'localhost';
const PORT = 4090;

app.listen(PORT, HOST, () => console.log('Node server is running at ' + HOST + ':' + PORT));


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
