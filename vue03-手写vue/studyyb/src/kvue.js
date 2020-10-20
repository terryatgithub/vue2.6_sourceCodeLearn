//框架
class Vue {
  constructor(options) {
    //保存选项
    this.$options = options;

    this.$data = options.data;

    //1. 响应化处理
    observe(this.$data);

    //2. 代理options.data
    proxy(this);

    //3. 编译
    new Compile(this.$options.el, this);
  }
}

//对象响应式处理
function observe(obj) {
  //判断obj必须是对象
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  //这里只做一件事，new一个Observer实例
  new Observer(obj);
}

//每一个响应式对象就伴生一个Observer实例
class Observer {
  constructor(value) {
    this.value = value;
    //判断value是obj还是数组
    this.walk(value);
    //todo 数组处理
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

//对象响应式原理实现
function defineReactive(obj, key, val) {
  //1. val可能是对象，需要递归处理
  observe(val);

  //这里涉及到闭包，巧妙地利用了闭包特性，是闭包的一个典型应用：
  //key/val/dep都是闭包里的变量，都会保存在内存中，不会释放

  //每执行一次defineReactive，就会创建一个Dep实例，
  //就是key和Dep 一对一的关系
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      console.log("get: ", val);
      // 依赖收集
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        console.log("set: ", newVal);
        //2. newVal可能是新的对象，需要额外处理
        observe(newVal);
        val = newVal;

        // 通知更新
        // watchers.forEach(w => w.update())
        dep.notify();
      }
    },
  });
}

//代理data属性到vm实例根下
function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(newVal) {
        vm.$data[key] = newVal;
      },
    });
  });
}

//编译过程
//用法: new Compile(el, vm)
class Compile {
  constructor(el, vm) {
    this.$vm = vm;

    this.$el = document.querySelector(el);

    //编译模板
    if (this.$el) {
      this.compile(this.$el);
    }
  }

  compile(el) {
    //开始递归遍历el
    el.childNodes.forEach((node) => {
      //判断其类型
      if (this.isElement(node)) {
        console.log("编译元素: ", node.nodeName);
        this.compileElement(node);
      } else if (this.isInterpolator(node)) {
        console.log("编译插值表达式: ", node.textContent);
        this.compileText(node);
      }

      //一旦牵扯到树，一定要记得递归遍历
      if (node.childNodes) {
        this.compile(node);
      }
    });
  }

  // 插值文本的编译
  compileText(node) {
    //获取匹配的表达式值
    this.update(node, RegExp.$1, "text");
  }

  // 编译元素
  compileElement(node) {
    //获取节点属性
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach((attr) => {
      // k-xxx="aaa"
      const attrName = attr.name; // k-xxx
      const exp = attr.value; // aaa
      //判断这个属性类型
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2);
        //执行指令
        this[dir] && this[dir](node, exp);
      }
      if (this.isEvent(attrName)) {
        // 事件处理
        // 事件监听
        this.eventHandler(node, exp, RegExp.rightContext);
      }
    });
  }
  // 事件监听
  // exp是方法名，比如onClick; dir是事件名称，比如click
  eventHandler(node, exp, dir) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp];
    node.addEventListener(dir, fn.bind(this.$vm));
  }
  // 文本指令
  text(node, exp) {
    this.update(node, exp, "text");
  }
  // html指令
  html(node, exp) {
    this.update(node, exp, "html");
  }
  // model指令
  model(node, exp) {
    // update方式只完成赋值和更新
    this.update(node, exp, "model");

    // 事件监听
    node.addEventListener("input", (e) => (this.$vm[exp] = e.target.value));
  }

  // 创建一个更新函数
  // 所有‘动态绑定’都需要创建更新函数、以及对应的Watcher实例
  update(node, exp, dir) {
    //先做初始化
    const fn = this[dir + "Updater"];
    fn && fn(node, this.$vm[exp]);

    //再更新
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val);
    });
  }

  textUpdater(node, val) {
    node.textContent = val;
  }
  htmlUpdater(node, val) {
    node.innerHTML = val;
  }
  modelUpdater(node, val) {
    // 表单元素赋值
    node.value = val;
  }

  //元素
  isElement(node) {
    return node.nodeType === 1;
  }

  //判断是否是插值表达式{{xx}}
  isInterpolator(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  isDirective(attrName) {
    return (
      attrName.startsWith("k-") && !["k-on"].some((v) => attrName.startsWith(v))
    );
  }
  isEvent(attrName) {
    return /(@|k-on:)/.test(attrName);
    //   return attrName.startsWith('@') || attrName.startsWith('k-on:')
  }
}

//仅供测试用
// const watchers = []

// Watcher : 小秘书，界面中的一个依赖对应一个watcher小秘书
// Q: Watcher在什么时候创建最合适？ A:
class Watcher {
  //key发生变化后，需要知道updateFn更新谁
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;

    // watchers.push(this)
    // 依赖收集：读一次数据，触发defineReactive里面的get()
    // @todo 这里做的非常精妙
    Dep.target = this; //官方做法
    this.vm[this.key]; //读一次值，会触发get
    Dep.target = null; //事情做完后要置空
  }

  // 将来管家Dep会调用
  update() {
    // 传入当前最新值给更新函数即可
    this.updateFn.call(this.vm, this.vm[this.key]);
  }
}

// 小管家，依赖收集，每个key对应一个Dep实例
class Dep {
  constructor() {
    this.deps = [];
  }

  // 依赖收集时，收集watcher
  addDep(watcher) {
    this.deps.push(watcher);
  }

  // set时通知更新
  notify() {
    this.deps.forEach((watcher) => watcher.update());
  }
}
