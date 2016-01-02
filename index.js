var koa = require('koa');
var path = require('path');
var app = koa();
var root = path.join(__dirname, 'www');
app.use(require('koa-static')(root));

app.listen(3000);

console.log('listening on port 3000');