function printLable(labelledObj: {label: string}) {
    console.log(labelledObj.label);
}
let obj = {size: 10, label: 'size 10 label'}
printLable(obj)

interface LabelledValue {
    label: string
}
function printL(labelledObj: LabelledValue) {
    labelledObj.label
}

//可选属性
//可选属性的好处之一是可以对可能存在的属性进行预定义
//之二是可以捕获’引用了不存在的属性时报的错误'
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): {color: string, area: number} {
    let newSquare = {color: 'white', area: 100}
    if (config.color) {
        newSquare.color = config.color
    }
    if(config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}
let mySquare = createSquare({color: 'black'})

只读属性
//
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = {x: 10, y: 10}

let a: number[] = [1,2,3,4]
let ro: ReadonlyArray<number> = a;
ro[0] = 11;//error
ro.push(5); //error
ro.length = 100//error
a = ro;//error!
a = ro as number[] // ok 类型断言


readonly or const ?
最简单判断要用哪个，是看要把它作为变量使用，还是作为属性使用
变量使用，用const
属性使用，用readonly

function fn(n:number):string {
    return 'hh'
}

额外的属性检查
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): { color: string, area: number} {

}
//绕开类型检查，最简便的方式是使用 类型断言：
let mySquare  = createSquare({width:100, opacity: 0.5} as SquareConfig); 
然而，最佳方式是能够添加一个字符串索引签名，前提是你能确定这个对象可能具有某些作为特殊用途使用的额外属性
interface SquareConfig {
    width?: number;
    color?: string;
    [propName: string]: any;
}

函数类型
// 为了使用接口表示函数类型，需要给接口定义一个‘调用签名’
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;


可索引的类型
可索引类型具有一个索引签名，描述了索引类型及对应的索引返回值类型
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["bob", "halo"]
let myStr: string = myArray[0]

ts支持两种索引签名： 字符串和数字

//可以将索引签名设置为只读，防止给索引赋值
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let arr: ReadonlyStringArray = ['alice', 'bob']
arr[2] = 'haha' //error

类静态部分和实例部分的区别
当操作类和接口的时候，要知道类是具有两个类型的：静态部分的类型和实例的类型

interface ClockConstructor { //为构造函数所用
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface { //为实例方法所用
    tick();
}
//第一个参数是ClockConstructor类型，
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute)
}
class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {}
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number)
    tick() {}
}
//会检查第一个参数是否符合构造函数签名
let digital = createClock(DigitalClock, 1, 1)
let analog = createClock(AnalogClock, 1, 1)


继承接口
interface Shape {
    color: string;
}
interface Square extends Shape {
    sideLength: number;
}
let s = <Square>{}
s.color = 'blue'
s.sideLength = 10

//继承多个接口
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
let s = <Square>{}
s.color = 'b'
s.sideLength = 10
s.penWidth = 5

