const resolve = dir => require('path').join(__dirname, dir)

//node 
module.exports = {
    publicPath: '/best-practice',
    devServer: { //webpack-dev-server
        port: 7070
    },
    //1. webpack配置通过configureWebpack配置
    //  1.1. 直接传对象,缺点是都是写死的固定的
    configureWebpack1: {
        //定义别名 @ 或者 comps
        resolve: {
            alias: {
                comps: require('path').join(__dirname, 'src/components')
            }
        },
        //2. <% webpackConfig.name %> 
        //修改index.html文件的title
        name: 'vue最佳实践',
    },
    // 1.2 用函数，可以动态配置
    configureWebpack: config => { //参数是vue的配置选项
        config.resolve.alias.comps = require('path').join(__dirname, 'src/components')

        // 环境变量
        if (process.env.NODE_ENV === 'development') {
            config.name = 'vue best practice'
        } else {
            config.name = 'vue最佳实践'
        }
        //可以返回一个config，vue会把这个跟默认的merge
    },

    //2. 链式操作
    //引入图标 svg-sprite-loader
    //icon-font 网站找图标
    //新建src/icons/svg
    chainWebpack(config) {
        //1. 项目中默认svg加载rule中排除掉icons/svg目录
        //1）在命令行用 vue inspect 检查项目所有的webpack配置
        //vue inspect > output.json 输出的文档里可以查看alias @的路径
        //2) vue inspect --rules 
        // vue inspect --rule svg 看到的默认配置在vue-cli源码里
        config.module.rule('svg')
            .exclude.add(resolve('src/icons'))

        //2. 配置 svg-sprite-loader
        config.module.rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons')) //添加处理目录
            .end() //回退到上一级，避免链式执行环境出错
            //vue inspect --rule icons
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({symbolId: 'icon-[name]'}) //引入图标时的名称,约定为icon开头
    }

}