const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const path=require('path');
const {CleanWebpackPlugin} = require('_clean-webpack-plugin@3.0.0@clean-webpack-plugin');
module.exports={
    entry:'./index.js',//入口文件
    output:{
        publicPath:__dirname+'dist',//js引用的路劲，也可以是cdn地址，按需加载的文件
        path:path.resolve(__dirname,'dist'),//出口目录，dist文件
        filename:'[name].[hash].js',//打包打出来的文件名
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',//所有的js都会使用babel-loader进行编译
                    options:{//仍然支持使用 query 参数来设置选项，但是这种方式已被废弃
                        presets:['@babel/preset-env','@babel/preset-react']//env包含了多个JS的版本(预设解析方式)，这里的配置可以分离出来，写道.babelrc文件中
                    }
                },
                // query:{
                //     presets:['env','react']//env包含了多个JS的版本
                // }
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:[
                    // {
                    //     loader:'style-loader',//style-loader为 css 对象提供了use()和unuse()两种方法可以用来加载和卸载css
                    //     options:{
                    //         singleton:true//处理为单个style标签
                    //     }
                    // },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // you can specify a publicPath here
                          // by default it use publicPath in webpackOptions.output
                          publicPath: path.resolve(__dirname,'dist/css')
                        }
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'postcss-loader'
                    }
                ],
                include:path.resolve(__dirname,'src')//打包包含的文件范围，exclude为不包含
            },
            {
                test:/\.scss$/,//遇到这种文件时，会倒叙的方式(sass-loader,css-loader,style-loader)使用如下三个loader
                exclude:/node_modules/,
                use:[
                    // {
                    //     loader:'style-loader'//将JS字符串生成为style节点
                    // },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // you can specify a publicPath here
                          // by default it use publicPath in webpackOptions.output
                          publicPath: path.resolve(__dirname,'dist/css')
                        }
                    },
                    {
                        loader:'css-loader'//将CSS转化成commonJS 模块
                    },
                    {
                        loader:'sass-loader'//将sass编译成css
                    }
                ]
            },
            {
                //file-loader:解析图片地址,把图片从源文件拷贝到目标文件并且修改源文件的名称
                //url-loader:可以在文件比较小的时候,直接变成base64镶嵌到页面中
                test:/\.(png|jpg|jepg|gif|svg)$/,
                exclude:/node_modules/,
                use:{
                    loader:'url-loader',
                    options:{
                        outputPath:'images/',//输出图片的路径
                        limit:5*1024
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",//就是对应于entry里面生成出来的文件名
            chunkFilename: "[id].css"//未被列在entry中，却又需要被打包出来的文件命名配置（在按需加载（异步）模块的时候，这样的文件是没有被列在entry中的）
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'src','index.html'),//模板
            filename:'index.html',
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩,去掉引号
            }
        }),
        new webpack.ProvidePlugin({//webpack.ProvidePlugin参数是键值对形式，键就是我们项目中使用的变量名，值就是键所指向的库
            '$':'juqery'
        }),
        new webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(process.env.NODE_ENV)
        })
    ],//加S的都是数组
    devServer:{//配置开发服务器
        contentBase:path.resolve(__dirname,'dist'),//静态文件根目录
        port:9000,//端口
        hot:true,
        host:'127.0.0.1',
        overlay:true,//当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
        compress:true,//服务器返回浏览器的时候是否启动gzip压缩
        proxy:{//跨域代理转发
            '/comments':{
                target:'https://m.weibo.cn',
                changeOrigin:true,
                logLevel:'debug',
                headers:{
                    Cookie:''
                }
            }
        },
        historyApiFallback:{
            //html5history模式
            rewrites:[
                {
                    from:/.*/,to:'index.html'
                }
            ]
        }
    }
}