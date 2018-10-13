var Parser = require('./parser');

module.exports = function plugin(options) {
    var parser = new Parser(options);
    var self = this;
    return function toVdom(root) {
        var h = self.data('h');
        if(h) {parser.h = h;}
        return parser.parse(root);
    }
};