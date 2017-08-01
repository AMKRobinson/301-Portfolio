'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function proxyGitHub(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (requestProxy({
    url: `https://api.github.com/${request.params[0]}`,
    headers: {Authorization: `token ${process.env.GITHUB_TOKEN}`}
  }))(request, response);

}

app.get('/github/*', proxyGitHub);

app.get('/index', function(request, response) {
  response.sendFile('index.html', {root: '.'});
});

app.listen(PORT, function() {
  console.log(`The server has started using this port:" ${PORT}"`);
});
