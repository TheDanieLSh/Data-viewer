'use strict';

const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express().use(cors())
                     .use(bodyParser.text({ type: 'text/plain' }))
                     .use(bodyParser.json())

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
