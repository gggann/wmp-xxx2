const { dirname } = require('path')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        // path: path.join(__dirname, './dist'),
        path: path.join('E://nginx-1.20.2/dist/xxx', './'),
        filename: 'bundle.js',
        clean: false
    },
    //devtool: 'inline-source-map', //跟eval几乎没区别  eval-source-map 
    //devtool:nosources-source-map,   //不爆露源码
    // devtool: 'nosources-source-map',    //隐藏或暴露代码
    devtool: 'nosources-source-map',
    devServer: {
        // contentBase: __dirname, -- 请注意，这种写法已弃用
        static: {
            directory: path.join(__dirname, "/src/"),   //C:\Users\sea\Desktop\nginx-1.20.2\dist\xxx
            // path.resolve(__dirname, "/"))
        },
        open: true,
        port: 8081,
        // host:'127.0.0.1'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    resolve:{
        alias:{
            '@':path.join(__dirname,'./src/')
        }
    },
   // target:'node' 这个是针对node模块的
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         template:'./src/index.html',
    //         filename:'index.html',
    //         inject:'body'
    //     })
    // ]
}

