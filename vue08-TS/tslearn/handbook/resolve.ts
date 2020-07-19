// 模块解析逻辑

// 模块解析策略
// node / classic

// 附加的模块解析标记
// baseUrl 所有非相对模块导入都会被当做相对于baseUrl

// 路径映射
// paths: {
//     "jquery": ["node_modules/jquery/dist/jquery"] //此处映射是相对于baseUrl
// }

//利用rootDirs指定虚拟目录
// "rootDirs": [
//     "src/views",
//     "generated/templates/views"
// ]

// 正常来讲，编译器会在开始编译之前解析模块导入。
// 每当它成功地解析了对一个文件import, 这个文件会被加到一个文件列表里，以供编译器稍后处理
