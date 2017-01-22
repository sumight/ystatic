const Random = require('mockjs').Random;

function generate(type) {
    if(type.indexOf('email') === 0) return Random.email();
    if(type.indexOf('date') === 0) return Random.date('T');
    if(type.indexOf('image') === 0) return Random.image('300x250');
    if(type.indexOf('name') === 0) return Random.name();
    if(type.indexOf('cname') === 0) return Random.cname();
    if(type.indexOf('title') === 0) return Random.title();
    if(type.indexOf('ctitle') === 0) return Random.ctitle();
    if(type.indexOf('paragraph') === 0) return Random.paragraph();
    if(type.indexOf('cparagraph') === 0) return Random.cparagraph();
    if(type.indexOf('url') === 0) return Random.url();
    if(type.indexOf('address') === 0) return Random.county(true);
    if(type.indexOf('county') === 0) return Random.county();
    if(type.indexOf('guid') === 0) return Random.guid();
}

module.exports = function(types) {
    var obj = {};
    types.forEach(type=>{
        obj[type] = generate(type);
    })
    return obj;
}
