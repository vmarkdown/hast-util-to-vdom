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
            var props = {
                attrs: {},
                domProps: {}
            };

            if(node.properties){

                if(node.properties.className) {
                    props['class'] = node.properties.className;
                }

                if(node.properties.innerHTML) {
                    props.domProps.innerHTML = node.properties.innerHTML;
                }

                Object.keys(node.properties).forEach(function (key) {
                    if( key ==='className' || key==='innerHTML' ){
                        return;
                    }
                    props.attrs[key] = node.properties[key];
                });

            }

            if(node.hasOwnProperty('key')){
                props.key = node.key;
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