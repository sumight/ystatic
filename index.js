var koa = require('koa');
var path = require('path');
var app = koa();
var root = path.join(__dirname, 'www');
var config = require('./config.json');

app.use(require('koa-static')(root));

app.listen(config.port);

console.log('listening on port '+config.port);