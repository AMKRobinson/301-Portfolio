'use strict'

let express = require('express');

const bodyParser = require('body-parser').urlencoded({extended: true});

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('./301-Portfolio'))

app.post('/article', bodyParser, function(request, response) {
  console.log(request.body);
  response.send('stuff');
})

app.listen(PORT, function() {
  console.log(`The server has started using this port:" ${PORT}"`);
});
