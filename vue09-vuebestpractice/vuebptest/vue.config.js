const resolve = dir => require('path').join(__dirname, dir)
const port = 7070

console.log(process.env.foo);
console.log(process.env.VUE_APP_BAZ);

module.exports = {
    //指定应用上下文，部署应用包时的基本url
    publicPath: '/best-practice',
    devServer: {
        port,
    },
    //配置webpack,两种方式，
    //1. 返回一个对象，会由 webpack-merge合并
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             comps: resolve('./src/components')
    //         }
    //     },
    //     name: 'vue best practice yuanbo.'
    // }
    //2. 用函数 直接操作config 或返回一个对象
    configureWebpack: config => {
        config.resolve.alias.comps = resolve('./src/components')
        config.resolve.alias.views = resolve('./src/views')
        config.resolve.alias.util = resolve('./src/util')
        config.name = 'vue bp yuanbo'
    },
    //chainWebpack 可以更细粒度地控制webpack内部配置
    chainWebpack(config) {
        //1. 禁用系统默认的svg处理， 用vue inspect查看默认规则
        config.module.rule('svg')
            .exclude.add(resolve('./src/icons'))

        //2. 加载 svg-sprite-loader
        config.module.rule('icons')
            .test(/\.svg$/)
            .include
                .add(resolve('./src/icons'))
                .end()
            .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({ symbolId: 'icon-[name]'})
    },
}