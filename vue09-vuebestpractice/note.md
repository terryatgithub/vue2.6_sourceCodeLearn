暗号： no can no bb

vue-cli3.0
vue-element-admin (vue-element-admin-tempate) 主要做管理系统
vuex-persist // 下去看看vuex-persist自动同步

其它vue业内共知组件库:
vue-element-ui
vant

# 项目配置策略
vue.config.js
webpack merge库，看下语法


## 自动化加载svg目录下所有svg文件
1. 实现动态加载svg素材
使用webpack提供require.context()方法指定svg为固定上下文
const req = require.context('./svg', false, /\.svg$/)
// keys()返回上下文中所有文件名
req.keys().map(req) //req是个函数

2. svgIcon组件化



## 环境变量和模式



git reset --hard step-1


新建res 以备用户切换角色
router.addRoutes() 动态追加路由

异步路由表
异步路由 webpack动态打包


按钮权限

## 导航菜单
递归组件
仔细看sidebar-item组件
函数式组件item.vue 使用了JSX语法

## 数据交互
多环境
.env.dev
自动区分开发环境 配置VUE_APP_BASE_API
request封装
axios单实例 
请求拦截 时设置令牌
响应拦截 统一做错误处理

### 数据mock
本地mock 
    在devServer加before 写接口
    要求明白express写法

线上mock
    easy-mock
    如果服务端有人用swagger定义过接口，可以直接根据swagger注释或yarm文件自动生成，不需要手写。

解决跨域：
    前端解决跨域
    proxy: 
    建议好好了解，不要只知道怎么用
    https://github.com/chimurai/http-proxy-middleware
    changeOrigin: 是否修改当前请求的域名，请求者信息在origin里

服务器api


## 项目测试
    Jest 既可以写测试 还可以跑测试
    npm run test:unit

    写测试3个概念
    1. 测试套件
    describe('Kaikeba.vue', () => {
        //测试用例
        test('测试add函数', () => {
            // 断言
            expect(add(1, 3)).toBe(4)
            expect(add(1, 3)).toBe(3)
        })
    })

### vue 组件测试
    官方测试套件
    @vue/test-utils
    模拟mount
    模拟交互 模拟点击

### 测试覆盖率
    jest.config.js
    /coverage/index.html 测试报告
        


