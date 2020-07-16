const htmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//导出配置
module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js'
    },
    resolve: {
        //设置模块导入的扩展名处理
        extensions: ['.js', '.ts', '.tsx']
    },
    //生成sourcemap并且速度较快
    devtool: 'cheap-module-eval-source-map',
    module: { //设置规则
        rules: [
            {
                test: /\.tsx?$/i,
                use: [{
                    loader: 'ts-loader'
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [ //设置插件
        new HtmlWebpackPlugin({
            //只要设置宿主模板即可
            template: './public/index.html'
        })
    ]
}