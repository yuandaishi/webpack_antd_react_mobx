1.用于webpack的学习
2.目的是构建一个react+antd+mobx+webpack的项目


操作步骤：
1.构建npm项目,生成packjson文件
    npm init -y //用默认的方式构建npm项目，生成默认的packjson文件
2.安装webpack相关包
    cnpm install webpack webpack-cli webpack-dev-server --save-dev //安装webpack，webpack-cli（此工具用于在命令行中运行 webpack），webpack-dev-server(服务)。不需要全局安装，仅作为打包依赖   安装即可
3.安装各种包文件(js,css,html,img,react)等等 
    cnpm install babel-loader @babel/core @babel/preset-env @babel/preset-react -D 其中babel-loader不能使用@的写法，其他的都可以使用(主要用于css处理)
    cnpm install style-loader css-loader postcss-loader autoprefixer node-sass sass-loader -D (主要用于CSS处理)
    cnpm install --save-dev mini-css-extract-plugin -D (提取CSS为单独的模块，不能和style-loader共用，style-loader是在html页面上添加style标签)
    cnpm install html-webpack-plugin -D(产出html)
    cnpm install file-loader url-loader -D (图片处理)(file-loader:解决CSS等文件中引入图片路径的问题,url-loader:当图片较小时,以base64编码处理,大于limit参数的时候还是使用file-loader进行拷贝)

4.配置webpack.config.js文件(简单例子)


