# vue+ts环境搭建

1. 安装ts，以在命令行使用tsc
    npm i -g typescript 
2. 生成配置文件 tsconfig.json
    tsc --init
3. 生成package.json
    npm init -y 
4. 创建文件
    index.ts
    index.html
5. 工程化
    安装相关工具 
    npm i webpack webpack-cli webpack-dev-server ts-loader typescript html-webpack-plugin
    //typescript 先后安装两次
    //本地装是为了让这些工具可以使用它
    //全局装是为了在命令行可以使用tsc命令

6. 处理配置文件
    /build/webpack.config.js

7. 处理项目目录
    build/webpack.config.js
    src/index.ts
    public/index.html //里面删除<script src='./index.js' />的引用，后续会自动注入

8. package.json
    添加npm run dev运行脚本
    "dev": "webpack-dev-server --config ./build/webpack.config.js"