// var renderer = require('./rehype-vue-renderer.js');
var mode = require('./mode');
var renderer = require('./renderer');

function Parser(options) {
    this.options = options || {};
    this.renderer = this.options.renderer;
    this.h = this.options.h;
}

Parser.prototype.parseNodes = function(nodes, parent) {
    if(!nodes || nodes.length === 0) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        node.index = i;
        node.parent = parent;
        var tempNode = this.parseNode(node);
        tempNode && vnodes.push(tempNode);
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node, parent) {
    if(!node) return null;
    var children = this.parseNodes(node.children, node);
    var h = this.h;
    // var renderer = this.renderer;
    // var properties = this.options.data?this.options.data(node):node.properties;
    // var properties = mode(node, h, this.options.mode);
    var data = mode(node, h, this.options.mode);
    var properties = data?data(node):{};
    return renderer[node.type].apply(null, [h, node, properties, children, this.options]);
};

Parser.prototype.parse = function(root) {
    try {
        root.properties = root.properties || {};
        root.tagName = this.options.rootTagName?this.options.rootTagName:'div';
        if( this.options.rootClassName ){
            root.properties.className = this.options.rootClassName || '';
        }
        return this.parseNode(root);
    }
    catch (e) {
        console.error(e);
        return this.h?this.h('div', {}, 'error'):null;
    }
};

module.exports = Parser;