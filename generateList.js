const generateObject = require('./generateObject');

module.exports = function(types, size, total) {
    return {
        data: Array(size).fill().map(item=>generateObject(types)),
        total: total
    }
}
