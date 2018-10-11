const express = require('express');
const request = require('request');

const app = express();
app.use(function(req, res, next) {
  console.log("REQUEST...");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ((req.get('X-Forwarded-Proto') !== 'https')) {
    return res.redirect('https://' + req.get('Host') + req.url);
  }
  next();
});

app.get('/logrocket', function(req, res) {
  console.log('REQUESTING...');
  request.get('https://blog.logrocket.com?format=json', function(error, response, body) {
    console.log('DONE...')
    console.log('ERRROR', error);
    console.log('RES', response.body);
    const trimmed = response.body.replace('])}while(1);</x>', '');
    const json = JSON.parse(trimmed);
    res.send(json);
  });
});

app.listen(3000);
console.log('LISTENING ON PORT 3000...');
