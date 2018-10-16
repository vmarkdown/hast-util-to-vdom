function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function isString(str) {
    return typeof str === 'string' || str instanceof String;
}

var defaultModes = {

    'vue': {
        test: function (h) {
            return h && h.toString().indexOf('vm') > -1;
        },
        data: function (node) {
            if(!node.properties) return {};
            var props = {
                attrs: node.properties,
                domProps: {}
            };
            if(node.properties.className) {
                props['class'] = node.properties.className;
                delete props.attrs.className;
            }

            if(node.html) {
                props.domProps.innerHTML = node.html;
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

module.exports = function (node, h, mode) {

    if(mode) {
        if( isString(mode) && defaultModes.hasOwnProperty(mode) ) {
            return defaultModes[mode].data;
        }

        if( isFunction(mode) ) {
            return mode;
        }
    }

    var list = Object.keys(defaultModes);
    for (var i=0;i<list.length;i++) {
        var item = list[i];
        var _mode = defaultModes[item];
        if( _mode.test(h) ) {
            return _mode.data;
        }
    }

    return null;
};