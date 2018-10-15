const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        'example-main': path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
        }
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'text-loader'
            }
        ]
    },
    externals: {
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'examples/src/index.html'
        })
    ],
    devServer: {
        // hotOnly: true,
        hot: false,
        inline: false,
        contentBase: path.join(__dirname, "www")
    }
};

