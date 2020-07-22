vue3

# 调试环境搭建

dev 加 --sourcemap

运行后从example起一个例子，断点跟进去跑初始化过程
createApp() //vue3初始化

#### 和vue2区别
vue3 
分包：多个包多模块管理  用lerna管理
rollup打包
    rollup.config.js
        tsPlugin
        entryFile 入口 src/runtime.ts src/index.ts
            packages/vue/src/index.ts
                runtime-dom
                compiler-dom

源码结构
    packages
        compiler-core
                 dom
                 sfc    
                 ssr
        reactivity 
            index.ts
        runtime-core
                dom
                test

Vue3模块
            vue3
runtime-dom     reactivity  compile-dom
runtime-core                compile-core

#### 开始探索
examples目录新建文件 写法跟vue2不一样了
<div id="app">
    <h1> {{message}} </h1>
    <comp >
</div>
//1. 创建实例方式变化了
const {createApp} = Vue
const app = createApp({
    data() {
        return {
            'message': 'hello vue3'
        }
    }
})
//2. 以前全局方法，变成实例方法了
app.component('comp', { //创建一个全局组件
    template: '<div>comp</div>'
}) 
//3. 可以使用链式调用了，类似jQuery那样
app.mount('#app')

##### vue.global.js
iife方法， exports.下挂载的属性和方法，（更像react了）
//村长要求尽快刷一遍：
https://vue-composition-api-rfc.netlify.com/api.html#setup

#### composition方式写
<div id="app">
    <h1> {{data.message}} </h1>
    <p @click="add">{{data.count}}</p>
    <p>{{data.doubleCount}}</p>
    <p>{{num}}</p>

</div>
//1. 创建实例方式变化了
const {createApp, reactive, computed, ref, toRefs} = Vue
const app = createApp({
    //composition api
    setup() {
        // reactivity api 响应式处理
        const data = reactive({
            message: 'hello, vue3',
            count: 0,
            doubleCount: computed(()=> data.count*2)
        })

        setTimeout(()=> {
            //this.message //摒弃了this，对ts编译器类型推断更简单
            data.message = 'vue3 hello'
        }, 1000)

        setInterval(()=>{
            data.count++
        }, 1000)

        //方法实现，不再用methods对象了
        //变化：分块管理，数据和对应的操作逻辑放在一起
        //组件变得庞大后，代码会按功能分区，数据和对数据的修改会在一起；
        //带来的好处是：在组件内的反复横跳会消失或好转
        //有利于tree shaking
        function add() { 
            data.count++
        }

        //单值响应式
        //ref类似react hooks，但更灵活，村长觉得比hooks好得多
        //ref()返回Ref对象，如果要修改它的值，必须（只能）访问value属性
        const num = ref(0)
        setInterval(()=>{
            num.value++
        }, 1000)

        //vue3响应式基于Proxy的，
        //toRefs()把每个对象的值都变成单值响应式的
        //组合所有数据供我的组件使用，这就是组合compostion 
        return {...toRefs(data), add, num}
    }
}).mount('#app')


##### 体验逻辑组合
vue2: Options Api
vue3 : 提高了复用性
    composition api带来的逻辑复用的好处
    useMouse() //值相关的额所有操作和mount/unmount逻辑，可以完全组合在一起，


## vue3响应式原理
vue2响应式原理回顾
1. 递归属性每个key 并且拦截每个key的访问
2. 数组 覆盖数组实例原型，覆盖7个方法，
缺点：
1. 如果当前数据非常庞大，初始化遍历过程会特别长，过程中要创建很多对象状态，（时间长，耗内存）
2. 新增删除属性无法监听，要用特定api
3. 
4.
5.

### vue3响应式核心： Proxy
const isObject = v => v!==null && typeof v === 'object'

//响应式
function reactive(obj) {
    if(!isObject(obj)) {return obj}

    //Proxy可以在当前对象外面加个壳
    return new Proxy(obj, { 
        //拦截对象属性的读取
        get(target, key, receiver){
            <!-- return target[key] //原始写法，可能会有些问题，建议用Reflect对象替代 -->
            //之前对obj对象的直接操作，都移到Reflect来做
            const ret = Reflect.get(target, key)
            console.log('get', key)

            //
            track(target, key)
            
            //嵌套对象和数组需要递归处理响应式
            //Proxy递归是惰性的，意思是：如果不读某个嵌套对象或数组，就永远不用对它做响应式处理
            return isObject(ret) ? reactive(ret) : ret
        },
        set(target, key, value, receiver){
            const ret = Reflect.set(target, key, value, receiver)


            return ret
        },
        deleteProperty(target, key){
            const ret = Reflect.deleteProperty(target, key)
            return ret
        },
    })
}
//state就是Proxy实例
const state = reactive({foo: 'foo', bar: {a: 1} arr:[1,2,3]})
//访问state属性，就是访问Proxy实例的方法
state.foo
state.foo='foooooo'
//设置不存在属性
state.bar = 'foo'
//删除
delete state.bar

//嵌套对象
state.bar.a = 10

//数组操作
state.arr.push(4)


https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

### vue3依赖收集
建立响应数据key和更新函数之间的映射关系
effect()  //跟useEffect()有点像

一句话： 把target.key和它依赖的callback之间建立依赖关系
共需3个函数

1. 声明一个响应函数，放入effectStack备用, 
    实现effect()
    const effectStatck = []
    effect(fn){
        const rxEffect = function(){
            //1. 捕获异常
            //2. fn入栈出栈
            //3. 执行fn
            try {
                effectStack.push(rxEffect) //push的是rxEffect，不是fn
                //执行fn，触发依赖收集
                //fn可能有回调函数,需要return
                return fn()
            } finally {
                //上述2件事做完后，就可以出栈了
                effectStack.pop()
            }
        }
        //执行一次,触发getter(),收集依赖
        rxEffect()

        return rxEffect
    }

2. 响应函数触发某个响应式数据，开始做依赖收集（映射过程）
    weakmap弱引用，因为key是对象，防止对象消失时内存泄漏
    WeakMap{ // Map: { key: [cb1,cb2]}}
        targetMap保存所有依赖
        Map保存某个对象里key的依赖
        Set保存对象里某个key的所有cb
    const targetMap = new WeakMap()
    实现跟踪函数 
    track(target, key) {
        //存入映射关系
        const effect = effectStack[effectStatk.length -1]
        if (effect) {
            let depsMap = targetMap.get(target)
            //首次访问不存在，创建一个
            if(!depsMap) {
                depsMap = new Map()
                targetMap.set(target, depsMap)
            }
            //存在则获取之，第一次可能为空，需要创建一个set
            let deps = depsMap.get(key)
            if(!deps) {
                deps = new Set()
                depsMap.set(key, deps)
            }
            //把响应函数放入集合
            deps.add(effect)
        }
    }

3.setter或deleteProperty触发时，根据影视关系执行对应cb
    实现触发函数 trigger(target, key){
        const depsMap = targetMap.get(target)
        if(depsMap) {
            //获取set
            const deps = depsMap.get(key)
            if (deps) {
                deps.forEach(effect => effect())
            }
        }
    }

computed底层用的也是effect(), 所以options有个lazy属性


## vite vs webpack


### vue3展望

    vue3比vue2好吗？
    







##
https://juejin.im/post/5af16a2cf265da0b8636353b


暗号：see you next time

作业：
用compostion api写个todo mvc，把今天涉及到的api都用下