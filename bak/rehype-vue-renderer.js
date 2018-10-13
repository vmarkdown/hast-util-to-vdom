function data(properties) {
    if(!properties) return {};
    var props = {
        attrs: properties,
    };
    if(properties.className) {
        props['class'] = properties.className;
        delete props.attrs.className;
    }
    return props;
}

module.exports = {

    root: function(h, node, children, options) {
        return h(node.tagName, data(node.properties), children);
    },
    element: function(h, node, children, options) {
        return h(node.tagName, data(node.properties), children);
    },
    text: function(h, node) {
        return node.value;
    }

};
