module.exports = function (node) {
    if(!node.properties) return {};
    var props = {
        attrs: node.properties,
    };
    if(node.properties.className) {
        props['class'] = node.properties.className;
        delete props.attrs.className;
    }
    return props;
};
