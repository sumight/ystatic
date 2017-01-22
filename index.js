var koa = require('koa');
var _ = require('koa-route');
var path = require('path');
var parse = require('co-busboy');
var app = koa();
var extend = require('extend');
var fs = require('fs');
var source = require('vinyl-source-stream')
var gulp = require('gulp')
var timeout = require('koa-timeout');

var generateObject =require('./generateObject.js');
var generateList =require('./generateList.js');

module.exports = function(argv) {
    // 默认配置
    defaultCfg = {
        port: 8080,
        index: 'index.html',
        root: './',
        whatever: '',
        // 文件上传存储的位置
        storage: './storage'
    }

    var cfg = extend({}, defaultCfg, argv);

    app.use(function *(next){
        this.set('Access-Control-Allow-Origin','*');
        yield next;
    });



    app.use(require('koa-static')(cfg.root , {
        index: cfg.index
    }));


    // whatever 页面, 无论如何都会返回
    app.use(function *(next){
        if(cfg.whatever && this.status===404) {
            this.body = fs.readFileSync(path.resolve(cfg.root, cfg.whatever)).toString();
        }

        yield next;
    });

    // 上传文件
    app.use(_.post('/_upload', function *(next) {

        // multipart upload
        var parts = parse(this);
        // 取第一个域
        var part = yield parts;

        part.pipe(source(part.filename))
            .pipe(gulp.dest(path.resolve(cfg.root, cfg.storage)));

        this.body = path.resolve('/', cfg.storage, part.filename);

        yield next;
    }));

    // 超时请求
    app.use(timeout(1e9));
    app.use(_.get('/_timeout', function *(next) {
        this.body ='timeout';
        var time = parseInt(this.query.time);

        // sleep
        yield new Promise(function(resolve) {
            setTimeout(()=>{
                resolve();
            }, isNaN(time)?1e9:time);
        });

        yield next;
    }));

    // 错误请求
    app.use(_.get('/_error', function *(next) {
        var status = parseInt(this.query.status);
        this.throw(isNaN(status)?null:status);
        yield next;
    }));

    // 列表数据请求
    app.use(_.get('/_list/:types', function *(types) {
        var size = this.query.size?parseInt(this.query.size):10,
            page = this.query.page?parseInt(this.query.page):1,
            total = this.query.total?parseInt(this.query.total):500;
        console.log('size', size);
        this.body = JSON.stringify(generateList(types.split('-'), size, total));
        // yield next;
    }));

    // 详情数据请求
    app.use(_.get('/_detail/:types', function *(types) {
        this.body = JSON.stringify(generateObject(types.split('-')));
        // yield next;
    }));

    // 异步表单校验
    app.use(_.get('/_valid', function *(next) {
        var value = this.query.value;
        console.log(value);
        if(!!value&&value.indexOf('true')>=0) {
            this.body = 'true';
        }else {
            this.body = 'false';
        }
        yield next;
    }));

    app.listen(cfg.port);

    console.log('listening on port '+cfg.port);
}
