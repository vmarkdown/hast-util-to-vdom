const path = require('path');

module.exports = [

    {
        mode: 'none',
        entry: {
            'hast-util-to-vdom': path.resolve(__dirname, 'index.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].common.js',
            libraryTarget: "commonjs2"
        },
        resolve: {
            alias: {
            }
        },
        module: {
            rules: [
            ]
        },
        externals: {
        },
        plugins: [
        ]
    },

    {
        mode: 'none',
        entry: {
            'rehype-vdom': path.resolve(__dirname, 'src/rehype-vdom.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].common.js',
            libraryTarget: "commonjs2"
        },
        resolve: {
            alias: {
                'hast-util-to-vdom': path.resolve(__dirname, 'src/to-vdom.js')
            }
        },
        module: {
            rules: [
            ]
        },
        externals: {
            'hast-util-to-vdom': 'hast-util-to-vdom'
        },
        plugins: [
        ]
    }

];

