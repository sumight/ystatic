#!/usr/bin/env node


var argv = require('yargs').argv;
var koa = require('koa');
var router = require('koa-router')();
var path = require('path');
var app = koa();
var extend = require('extend');
var fs = require('fs');
// 默认配置
defaultCfg = {
    port:4000,
    index: 'index.html',
    root: './',
    notfound: ''
}

var cfg = extend({}, defaultCfg, argv);

router.get('/**', function* (next) {
    if(cfg.notfound === '') {
        this.body = '<h1 style="text-align:center;margin-top:100px;">😢 Not Found </h1>';
    }else {
        this.body = fs.readFileSync(path.resolve(cfg.root, cfg.notfound)).toString();
    }
    yield next;
})



app.use(function *(next){
    this.set('Access-Control-Allow-Origin','*');
    yield next;
});

app.use(require('koa-static')(cfg.root , {
    index: cfg.index
}));

app.use(router.routes())

app.listen(cfg.port);

console.log('listening on port '+cfg.port);
