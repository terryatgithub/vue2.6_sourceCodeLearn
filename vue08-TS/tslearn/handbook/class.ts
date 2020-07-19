// TS使用的是结构性类型系统
// 当比较两种不同的类型时，并不在乎他们从何而来，如果所有成员的类型都是兼容的，就认为它们的类型是兼容的

//参数属性
class Octopus {
    readonly numberOfLegs: number = 8
    constructor(readonly name: string) {

    }
}

//存取器
let passcode = '1234'

class Employee {
    private _fullname: string;

    get fullName() {
        return this._fullname
    }

    set fullName(newName: string) {
        if(passcode && passcode === '1234') {
            this._fullname = newName
        } else {
            console.log('error');
        }
    }


}

//静态属性

//抽象类
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!import!!!!!!!!!!!!!!!!
//高级技巧
//当在TS里声明一个类的时候，实际上同时声明了很多东西。 
//1. 首先就是’类的实例的类型‘
class Greeter {
    greeting: string;
    constructor(message: string)  {
        this.greeting = message
    }
    greet() {
        return 'hello ' + this.greeting
    }
}
//这里意思是greeter是Greeter类的实例，它的类型是 Greeter
let greeter: Greeter; 
greeter = new Greeter('world')
console.log(greeter.greet());
//2. 同时也创建了一个叫’构造函数‘的值，这个函数会在使用new创建类实例的时候被调用
//这个构造函数包含类的所有静态属性，
//换个角度说，可以认为类具有实例部分和静态部分 这2个部分
// 改写下例子:
class Greeter2 {
    static standardGreeting = 'Hello, there'
    greeting: string;
    greet() {
        if (this.greeting) {
            return 'hello' + this.greeting
        } else {
            return Greeter2.standardGreeting //直接用类名引用静态属性
        }
    }
}
let greeter2: Greeter2;
greeter2 = new Greeter2()
greeter2.greet()

//直接使用类 
//typeof Greeter2 意思是取Greeter2类的类型，而不是实例的类型；
//或者更准确地说，’告诉我Greeter标识符的类型‘也就是构造函数的类型
//这个类型包含了类的所有静态成员和构造函数
//greeterMaker这个变量保存了这个类或者说保存了类构造函数,
//（指向了构造函数的引用）
let greeterMaker: typeof Greeter2 = Greeter2;
greeterMaker.standardGreeting = 'Hey there'

let greeter3: Greeter2 = new greeterMaker()
greeter3.greet()



var Greeter1 = (function(){
    function Greeter(message) {
        this.greeting = message
    }
    Greeter.prototype.greet = function() {
        return 'hello' + this.greeting
    }
    return Greeter
})()


//把类当做接口使用
//类定义会创建2个东西： 类的实例类型 和 一个构造函数
//因为类可以创建出类型，所以你能够在允许使用接口的地方使用类
class Point {
    x: number
    y: number
}
interface Point3d extends Point {
    z: number
}
let point3d: Point3d = {x: 1, y: 2, z: 3}