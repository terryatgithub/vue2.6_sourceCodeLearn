//@todo
//1. Obeserver/observe数据响应式这套流程太精妙，熟练到了如指掌（对对象监听递归的处理）
//2. compile对元素编译的细节（递归的处理，同样要学习）
//2. watcher/Dep的设计和使用，也是极其精妙，熟练之
const originalArrProto = Array.prototype;
const augmentArrProto = Object.create(originalArrProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach(method => {
    augmentArrProto[method] = function () {
        //@todo this?
        originalArrProto[method].apply(this, arguments)
        console.log('array execute ' + method + ' opertions');

    }
})
function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return
    }
    if (Array.isArray(obj)) {
        obj.__proto__ = augmentArrProto
        //对数组内部的所有元素做数据绑定
        const keys = Object.keys(obj)
        for (let i = 0, len = obj.length; i < len; i++) {
            observe(obj[i])
        }
    } else {
        new Observer(obj)
    }
}
function defineReactive(obj, key, val) {
    //每个key都有单独的闭包作用域
    //所以每个key都有一个dep管家

    //递归对象，每个对象新建一个Observer
    observe(val)
    let dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}`);
            //@todo
            //数据绑定
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            console.log(`set ${key}`);
            if (newVal !== val) {
                val = newVal
                observe(newVal)
                //@todo
                //触发该key对应的所有watcher
                dep.notify()
                // watchers.forEach(dep => dep.update())
            }
        }
    })
}
//框架构造函数
class BVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data

        //实现数据响应式绑定
        observe(this.$data)
        //代理data到vm
        this.proxy(this, '$data')

        //编译，主要作用是收集依赖
        new Compiler(this.$options.el, this)
    }

    proxy(vm) {
        Object.keys(vm.$data).forEach(key => {
            //这里必须定义成存取器的形式,用代理的形式（nb，学习）
            Object.defineProperty(vm, key, {
                get() {
                    return vm.$data[key]
                },
                set(newVal) {
                    if (newVal !== vm.$data[key]) {
                        vm.$data[key] = newVal
                    }
                }
            })
        })
    }
}
//实现数据响应式，区分数组和对象
class Observer {
    constructor(obj) {
        this.value = obj
        if (Array.isArray(obj)) {
            obj.__proto__ = augmentArrProto
            this.walkArray(obj)
        } else //if (typeof obj === 'object' && obj !== null) {
            this.walk(obj)
    }

    walkArray(obj) {
        for (let i = 0; i < obj.length; i++) {
            observe(obj[i])
        }
    }
    walk(obj) {
        Object.keys(obj).forEach(key => {
            //每个key都定义响应式
            //每个key都有单独的dep
            defineReactive(obj, key, obj[key])
        })
    }
}
//编译模版，初始化视图，收集依赖（更新函数，Watcher创建）
class Compiler {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        if (this.$el) {
            this.compile(this.$el)
        }
    }

    compile(el) {
        const nodes = el.childNodes
        Array.from(nodes).forEach(node => {
            //@todo 严格地分为了元素和文本
            if (this.isElement(node)) {
                console.log('element node:' + node.nodeName);
                this.compileElement(node)
            } else if (this.isInter(node)) {
                console.log('text {{}} node' + node.textContent);
                this.compileText(node)
            }
            //元素递归
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }

    isElement(el) {
        return el.nodeType === 1
    }

    isInter(el) {
        return el.nodeType === 3 && /\{\{(.*)\}\}/.test(el.textContent)
    }

    compileElement(el) {
        const nodeAttrs = el.attributes
        Array.from(nodeAttrs).forEach(attr => {
            let attrName = attr.name
            let exp = attr.value
            if (this.isDirective(attrName)) {
                let dir = attrName.substring(2)
                this[dir] && this[dir](el, exp)
            }
        })
    }
    isDirective(attr) {
        return attr.startsWith('b-')
    }
    text(el, exp) {
        this.update(el, exp, 'text')
    }
    textUpdater(node, exp) {
        node.textContent = exp
    }
    html(el, exp) {
        this.update(el, exp, 'html')
    }
    htmlUpdater(node, exp) {
        node.innerHTML = exp
    }
    model(node, exp) {
        console.log('model' + exp);

        this.update(node, exp, 'model')
        node.addEventListener('input', e => {
            this.$vm[exp] = e.target.value
        })
    }
    modelUpdater(node, exp) {
        node.value = exp
    }
    compileText(el) {
        console.log(`${RegExp.$1}`);
        this.update(el, RegExp.$1, 'text')
    }
    //集中到update来变更
    update(node, exp, dir) {
        //初始化视图
        //更新函数，方便后续watcher的闭包调用
        let fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])
        //@todo
        //后续更新视图的处理，nb
        new Watcher(this.$vm, exp, (val) => {
            //后续更新，值是最新的值
            fn && fn(node, val)
        })
    }
}
// const watchers = []
//执行更新函数（更新DOM）
class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn
        // watchers.push(this)
        //@todo 这里的处理太nb
        //创建watcher时，触发getter，主动把自己添加到该key对应的Dep管家上
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }

    update() {
        // this.updateFn(this.vm[this.key])
        //@todo
        this.updateFn.call(this.vm, this.vm[this.key])
    }

}

//管理多个watcher，批量更新
//每个key的watcher管家
//每个key都有一个DEP，来管理这个key绑定的watcher
class Dep {
    constructor() {
        this.deps = []
    }
    addDep(dep) {
        this.deps.push(dep)
    }
    notify() {
        this.deps.forEach(dep => dep.update())
    }
}