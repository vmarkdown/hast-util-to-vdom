var modes = {

    'vue': {
        test: function (h) {
            return h && h.toString().indexOf('vm') > -1;
        },
        data: function (node) {
            if(!node.properties) return {};
            var props = {
                attrs: node.properties,
            };
            if(node.properties.className) {
                props['class'] = node.properties.className;
                delete props.attrs.className;
            }
            return props;
        }
    },

    'preact': {
        test: function () {
            return false;
        },
        data: function (node) {
            return node.properties;
        }
    }

};

function isFunction(obj){
    return Object.prototype.toString.call(obj)==='object Function';
}

function isString(str) {
    return typeof str === 'string' || str instanceof String;
}

module.exports = function (node, h, mode) {

    if(mode) {
        if( isString(mode) && modes.hasOwnProperty(mode) ) {
            return modes[mode].data;
        }

        if( isFunction(mode) ) {
            return mode;
        }
    }

    var list = Object.keys(modes);
    for (var i=0;i<list.length;i++) {
        var item = list[i];
        var _mode = modes[item];
        if( _mode.test(h) ) {
            return _mode.data;
        }
    }

    return null;
};