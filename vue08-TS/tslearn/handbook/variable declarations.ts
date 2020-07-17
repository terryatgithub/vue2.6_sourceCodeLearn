import { C } from "./triple-slash directives";

for(var i = 0; i < 10; i ++ ) {
    setTimeout(()=>console.log(i), 0);
}

for (let i = 0; i < 10; i++) {
    //IIFE
    //immediately invoked function expression
    //立即自调用执行函数
    (function(i){
        setTimeout(()=>console.log(i), 0);
    })(i)
}

//解构
//解构数组
let input = [1, 2]
let [first, second] = input

[first, second] = [second, first]

function f([first, second]: [number, number]) {
}
f(input)

let [first, ...rest] = [1,2,3,4]
first // 1
rest //[2,3,4]

let [first] = [1,2,3,4]
first // 1

let [, second, , forth] = [1, 2, 3, 4]

//对象解构
let o = {
    a: 'foo',
    b: 12, 
    c: 'bar'
}
let {a, b} = o;
({a, b} = {a: 'baz', b: 101}) //注意这里要用括号括起来，因为JS通常会将以{}起始的语句解析为一个块
let {a, ...pashthrought} = o
let total = pashthrought.b + pashthrought.c.length

//属性重命名
let {a: newName1, b: newName2} = o
// is like
let newName1 = o.a
let newName2 = o.b
let {a, b} : {a: string, b: number } = o

//默认值
function keepWholeObject(wholeObject: {a: string, b?: number}) {
    let { a, b = 1001 } = wholeObject
}
//函数生命
type C = {a: string, b?: number}
function f({a, b}: C): void {

}

function f({a="", b=0} = {}): void {

}


展开
//展开操作符正与解构相反，它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象
//数组展开
let first = [1, 2]
let second = [3, 4]
let both = [0, ...first, ...second, 5]
//对象展开
let default = {
    food: 'spicy',
    price: '$5',
    ambiance: 'noisy'
}
let search = {...default, food: 'rich'}

对象展开有一些限制，
1. 仅包含对象的可枚举属性
class C {
    p = 12;
    m(){}
}
let c = new C()
let clone = {...c}
clone.p //ok
clone.m() //error
