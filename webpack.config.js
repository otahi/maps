const path = require('path');
module.exports = {
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [
                { loader: 'ts-loader' }
            ]
        }]
    },
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, './')
    }
};