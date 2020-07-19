interface Bird {
    fly();
    layEggs();
}
interface Fish {
    swim();
    layEggs()
}
function getSmallPet(): Bird | Fish {
    return 
}
let pet = getSmallPet()
//类型保护和区分类型
//类型断言
if ((<Fish>pet).swim) {
    (<Fish>pet).swim()
} else {
    (<Bird>pet).fly()
}
//类型保护机制
//类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型
//要定义一个类型保护，只要简单地定义一个函数，它的返回值是一个 类型谓词：
//这里pet is Fish 就是类型谓词。
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined
}
if (isFish(pet)) {
    pet.swim()
} else {
    pet.fly()
}
//typeof 类型保护
//TS将‘typeof x === 'number' 识别为一个类型保护
//typeof x === 'typename'
//typeof x !== 'typename'
//typename 必须是 number /string/boolean/symbol，才能被识别为’typeof 类型保护'
function isNumber(x: any): x is number {
    return typeof x === 'number'
}
function isString(x: any): x is string {
    return typeof x === 'string'
}
function padLeft(value: string, padding: string | number ) {
    if (isNumber(padding)) {
        return Array(padding+1).join(' ') + value
    }
    if (isString(padding)) {
        return padding + value
    }
    throw new Error('Expected string or number, got' + padding)
}
function padLeft1(value: string, padding: string | number) {
    if (typeof padding === 'string') {
        return padding + value
    }
    if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value
    }
    throw new Error('error.')
}
//instanceof 类型保护

// --strictNullChecks 可选参数会被自动加上 | undefined

//使用类型保护来去除断言
 function f(sn: string | null): string {
     return sn || 'default' //用短路运算符，消除null
 }
 //用类型断言手动去除 null 或 undefined, 语法是添加 !后缀
//  identifier! 从 Identifier类型里去除了 null 和 undefined
function broken(name: string | null): string {
    function postfix(epithet: string) {
        return name!.charAt(0) + '. the ' + epithet //name! 用类型断言手动去除null
    }
    name = name || 'default'
    return postfix(name)
}

//使用never类型进行完整性检查
function assertNever(x: never): never {
    throw new Error('Unexpected object: ' + x)
}
//多态的this类型，实现计算器类继承的链式调用
//类似C++多态的使用

// keyof T '索引类型'查询操作符
// 对于任何类型T， keyof T 的结果为 T 上已知的公共属性名的联合，例如
interface Person {
    name: string;
    age: number;
}
let personProps: keyof Person; // 'name' | 'age'
let person: Person
//T[K] 索引访问操作符
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name]
}
let name1:string = getProperty(person, 'name')
let age: number = getProperty(person, 'age')
//getProperty里的o:T 和 name: K 以为这 o[name]: T[K]

interface Map1<T> {
    [key: string]: T
}
let keys: keyof Map1<number>; //string
let value: Map1<number>['foo'] //number
