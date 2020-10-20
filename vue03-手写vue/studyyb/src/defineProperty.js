//数组响应式
//1. 替换数组原型中7个方法
const originalProto = Array.prototype;
// 备份一份，修改备份
const arrayProto = Object.create(originalProto);
["push", "pop", "shift", "unshift", "sort", "reverse", "splice"].forEach(
  (method) => {
    arrayProto[method] = function () {
      //原始操作
      originalProto[method].apply(this, arguments);
      //覆盖操作：通知更新
      console.log("数组执行: ", method, "操作: ");
    };
  }
);

//对象响应式原理实现
//1. Object.defineProperty()
function defineReactive(obj, key, val) {
  //1. val可能是对象，需要递归处理
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get: ", val);
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        console.log("set: ", newVal);
        //2. newVal可能是新的对象，需要额外处理
        observe(newVal);
        val = newVal;
      }
    },
  });
}

//对象响应式处理
function observe(obj) {
  //判断obj必须是对象
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  //判断传入的obj类型
  if (Array.isArray(obj)) {
    // 设置实例的原型用__proto__属性
    // 覆盖原型，替换7个变更操作
    obj.__proto__ = arrayProto;
    // 对数组内部的元素 执行响应化
    const keys = Object.keys(obj);
    // for (let i = 0; i < obj.length; i++) {
    //   observe(obj[i]);
    // }
    keys.forEach(i => observe(i))
  } else {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

//3. 当属性是动态追加时，没有经过属性拦截设置
//需要模拟Vue.set()方法，新属性不能直接赋值，必须用set()方法
function set(obj, key, val) {
  defineReactive(obj, key, val);
}

//4. 删除需要del方式，待实现

const obj = { foo: "foo", bar: "bar", baz: { a: 1 }, arr: [1, 2, 3, ['a', 'b'], {aa: 1, bb: 2}] };
// defineReactive(obj, 'foo', 'foo')
observe(obj);
// obj.foo;
// obj.foo = "fooooooo";
// obj.bar;
//case 1: 嵌套对象 //一旦嵌套，就要做递归，否则嵌套的对象无法做响应
// obj.baz.a = 10;

//case 2: 直接用对象赋值，全新的对象没有处理，无法响应
// obj.baz = { a: 10 };
// obj.baz.a = 100;

//case 3: 动态追加值 新增的属性无法被拦截
// obj.dong = 'dong'
// set(obj, 'dong', 'dong')
// obj.dong

//case 4：数组的情况
//重写数组实例的原型
// obj.arr.push(4);
// obj.arr.pop()
// obj.arr.shift()
// obj.arr.unshift(5)
// obj.arr.sort()
// obj.arr.reverse()
// obj.arr.splice(0, 1, 6)
obj.arr
obj.arr[3].push('c')
obj.arr[4].cc = 'c'
obj.arr[4].cc = 'd'
obj.arr
set(obj.arr[4], 'cc', 'e')
set(obj.arr[4], 'cc', 'f')
obj.arr[4].cc
obj.arr[4].cc = 5
