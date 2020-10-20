//数据响应式处理
function defineReactive(obj, key, val) {
  //如果val是对象，需要递归处理，一旦嵌套就要做递归
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get: ", val);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set: ", newVal);
        // obj[key] = newVal //bug1 会导致反复set死循环
        //为什么这里可以用val直接保存newVal，因为这里val已经是闭包了！！！
        //obj, key, val都是闭包，所以可以直接使用
        //用val保存新设置的值
        //2. newVal可能是新的对象，需要劫持
        observe(newVal);
        val = newVal;
      }
    },
  });
}

//对象响应式处理
function observe(obj) {
  //判断是否对象
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  //遍历对象
  Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

const obj = { foo: "foo", bar: "bar", baz: { a: 1 } };
// defineReactive(obj, "foo", "foo");
observe(obj);
// obj.foo;
// obj.foo = "foooooo";
// obj.bar;
//1. 嵌套对象的处理:
// obj.baz.a = 10;

//2. 直接用对象赋值，全新的对象没有被劫持，不能响应
obj.baz = { a: 10 };
obj.baz.a = 100;

//3. 动态追加属性，新增的属性无法被拦截
set(obj, "dong", "dong");
obj.dong;
obj.dong = "dong11";
