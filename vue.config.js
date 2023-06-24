/*
npm install webpack -g
npm install webpack-cli -g
npm install webpack-dev-server -g
webpack -v// 查看版本号
npm install webpack webpack-cli -D// webpack依赖
npm install clean-webpack-plugin -D// 先清除文件夹内容，然后再将打包的内容放置进去
npm install html-webpack-plugin -D// 压缩html文件
npm install webpack-dev-server -D// 启动服务
npm install style-loader css-loader -D// 处理css文件
npm install url-loader file-loader -D// 处理图片
npm install sass-loader node-sass -D// 编译sass
npm install less less-loader -D// 编译less
npm install babel-loader babel-core @babel/core babel-preset-react babel-preset-env -D// 编译es、jsx代码

npm install webpack webpack-cli clean-webpack-plugin html-webpack-plugin webpack-dev-server style-loader css-loader url-loader file-loader sass-loader node-sass less less-loader babel-loader @babel/core babel-core babel-preset-react babel-preset-env -D
 */

const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");// 先清除文件夹内容，然后再将打包的内容放置进去
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",// 指定模式，development(开发者模式),production(生产者模式)
    // 统一打包
    entry: "./src/one.js",// 入口文件,单入口
    //  entry: ["./src/one.js","./src/two.js"],// 入口文件，多入口
    output: {// 出口文件
        path: path.resolve(__dirname, 'dist'),
        filename: 'abc.js'
    },
    // // 分别打包
    // entry: {
    //     first: "./src/one.js",
    //     second: "./src/two.js"
    // },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: '[name].abc.js'
    // },
    devServer: {
        open: true,// 自动打开
        https: false,// 是否使用https
        port: 8000,// 端口号
        host: "127.0.0.1",// 域名
        // openPage: 'index',// 配置项用于打开指定 URL 的网页。
        hot: true,// 热更新
        proxy: {// 服务器代理
            '/proxy': {// 规则，以/proxy开头的地址会使用该规则，例如：http://127.0.0.1:8000/proxy/login
                target: 'http://127.0.0.1:80',// 设置你要访问的服务器，例如http://127.0.0.1/proxy/login
                changeOrigin: true,// 是否开启代理
                ws: false, // 是否启用websockets
                pathRewrite: {
                    '^/proxy': '',// 将以 /proxy 开头的这一部分用空字符串替换掉，最后访问的地址为 http://127.0.0.1/login
                }
            }
        },
        allowedHosts: [// 配置一个白名单列表，只有HTTP请求的HOST在列表里才正常返回
            // 'www.baidu.com',
        ],
        compress: false,// 配置是否启用 gzip 压缩。boolean 为类型，默认为 false。
    },
    module: {
        rules: [// 规则
            {
                test: /.\.css$/,
                loader: ["style-loader", "css-loader"]
            },
            {
                test: /.\.(png|gif|jpg|jpeg|svg)$/,
                // 第一种写法
                loader: "url-loader",
                query: {
                    limit: 120003,// limit(限制)的值小于图片的大小，不转换，否则转换
                    outputPath: "img",// 指定图片存放的地址
                }
                // 第二种写法
                // use: [
                //     {
                //         loader: "url-loader",
                //         query: {
                //             limit: 120003,// limit(限制)的值小于图片的大小，不转换，否则转换
                //             outputPath: "img",//指定图片存放的地址
                //         }
                //     }
                // ]
            },
            {
                test: /.\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            },
            {
                test: /.\.less$/,
                loader: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /.\.js$/,
                exclude: /node_modules/,// 排除node_modules目录
                loader: "babel-loader",
                query: {
                    presets: [
                        //"babel-preset-react",// 解析react代码
                        "babel-preset-env"
                    ]
                }
            }
        ]
    },
    plugins: [// 插件
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "自定义标题",// 标题,还需要在模板html文件中通过<%= htmlWebpackPlugin.options.title %>进行输出
            filename: "index.html",// 指定生成的文件名，默认为index.html
            template: "./public/index.html",// 将指定的文件视为一个模板，生成的html即以该模板为参考对象
            hash: true,// hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值,为 false
            favicon: "./src/assets/image/站标.jpg",// 给生成的 html 文件生成一个 站标。属性值为 站标 文件所在的路径名
            minify: { // 压缩HTML文件
                caseSensitive: true,// 是否对大小写敏感，默认false
                collapseBooleanAttributes: true,// 是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认,false
                collapseWhitespace: true,// 是否去除空格，默认false
                minifyCSS: true,// 是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
                minifyJS: true,// 是否压缩html里的js（使用uglify-js进行的压缩）
                preventAttributesEscaping: true,// Prevents the escaping of the values of attributes(防止转义属性值)
                removeAttributeQuotes: true,// 是否移除属性的引号 默认false
                removeComments: true,// 是否移除注释 默认false
                removeCommentsFromCDATA: true,// 从脚本和样式删除的注释 默认false
                removeEmptyAttributes: true,// 是否删除空属性，默认false
                removeOptionalTags: false,//  若开启此项，生成的html中没有 body 和 head，html也未闭合
                removeRedundantAttributes: true,// 删除多余的属性
                removeScriptTypeAttributes: true,// 删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值,false
                removeStyleLinkTypeAttributes: true,// 删除style的类型属性， type="text/css" 同上
                useShortDoctype: true,// 使用短的文档类型，默认false
            },
            cache: true,// 默认是true的，表示内容变化的时候生成一个新的文件。
            showErrors: true,// 这个我们自运行项目的时候经常会用到，showErrors 的作用是，如果 webpack 编译出现错误，webpack会将,错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息。开启这个，方便定位错误
            // chunks: ["first"],// chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks ,就能选择你要使用那些js文件，而如果没有指定 chunks 选项，默认会全部引用。
            // excludeChunks: ["second"],// 排除掉一些js,second.js问价就不会在html文件中引用
            inject: true,// 1、true：默认值，script标签位于html文件的 body 底部; 2、body：script标签位于html文件的 body 底部,（同 true）; 3、head：script 标签位于 head 标签内; 4、false：不插入生成的 js 文件，只是单纯的生成一个 html 文件

            arr: [1, 2, 3, 4, 5],// 自定义的属性，在html中使用htmlWebpackPlugin.options.arr
        }),

    ]
}

