module.exports = {

    root: function(h, node, properties, children, options) {
        return h(node.tagName, properties, children);
    },
    element: function(h, node, properties, children, options) {
        return h(node.tagName, properties, children);
    },
    text: function(h, node) {
        return node.value;
    },
    comment: function () {
        
    }

};
