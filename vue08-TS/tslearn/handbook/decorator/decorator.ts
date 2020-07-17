装饰器
function sealed(target) {

}

装饰器工厂
function color(value: string) {
    return function(target) {

    }
}

装饰器组合
class C {
    @f()
    @g()
    method(){

    }
}
// 同样的，在TypeScript里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：
// 由上至下依次对装饰器表达式求值。
// 求值的结果会被当作函数，由下至上依次调用。

装饰器求值
// 类中不同声明上的装饰器将按以下规定的顺序应用：
// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
// 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
// 参数装饰器应用到构造函数。
// 类装饰器应用到类。

类装饰器
// 类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如declare的类）。
// 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return "hello, " + this.greeting
    }
}
function sealed(constructor: Function){
    Object.seal(constructor)
    Object.seal(constructor.prototype)
}

@classDecorator 
class Greeter {
    property = "property"
    hello: string;
    constructor(m: string) {
        this.hello = m
    }
}
function classDecorator<T extends {new(...arg: any[]): {}}>(constructor: T) {
    return class extends constructor {
        newProperty = 'new property'
        hello = 'override'
    }
}
console.log(new Greeter('world'));


方法装饰器
// 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如declare的类）中。
// 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

// 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 成员的名字。
// 成员的属性描述符。
// 注意  如果代码输出目标版本小于ES5，属性描述符将会是undefined。

// 如果方法装饰器返回一个值，它会被用作方法的属性描述符。

class Greeter {
    greeting: string;
    constructor(message: string){
        this.greeting = message
    }
    @enumerable(false)
    greet(){
        return 'Hello ' + this.greeting
    }
}
// 这里的@enumerable(false)是一个装饰器工厂。 当装饰器 @enumerable(false)被调用时，它会修改属性描述符的enumerable属性
function enumerable(value: boolean) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value
    }
}

访问器装饰器
// 访问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）。 访问器装饰器应用于访问器的 属性描述符并且可以用来监视，修改或替换一个访问器的定义。 访问器装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里。

// 注意  TypeScript不允许同时装饰一个成员的get和set访问器。取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。这是因为，在装饰器应用于一个属性描述符时，它联合了get和set访问器，而不是分开声明的。

// 访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

// 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 成员的名字。
// 成员的属性描述符。
// 注意  如果代码输出目标版本小于ES5，Property Descriptor将会是undefined。

// 如果访问器装饰器返回一个值，它会被用作方法的属性描述符。

class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    @configurable(false)
    get x() {
        return this._x
    }

    @configurable(false)
    get y() {
        return this._y
    }
}
function configurable(value: boolean) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value
    }
}


属性装饰器
// 属性装饰器声明在一个属性声明之前（紧靠着属性声明）。 属性装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里。

// 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

// 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 成员的名字。
// 注意  属性描述符不会做为参数传入属性装饰器，这与TypeScript是如何初始化属性装饰器的有关。 因为目前没有办法在定义一个原型对象的成员时描述一个实例属性，并且没办法监视或修改一个属性的初始化方法。返回值也会被忽略。因此，属性描述符只能用来监视类中是否声明了某个名字的属性。
class Greeter {
    @format("hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message
    }

    greet() {
        let formatString = getFormat(this, 'greeting')
        return formatString.replace('%s', this.greeting)
    }
}

参数装饰器
// 参数装饰器声明在一个参数声明之前（紧靠着参数声明）。 参数装饰器应用于类构造函数或方法声明。 参数装饰器不能用在声明文件（.d.ts），重载或其它外部上下文（比如 declare的类）里。
// 参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
// 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 成员的名字。
// 参数在函数参数列表中的索引。
// 注意  参数装饰器只能用来监视一个方法的参数是否被传入。
// 参数装饰器的返回值会被忽略。
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message
    }

    @validate
    greet(@required name: string) {
        return "hello " + name + ", " + this.greeting
    }
}
// @required装饰器添加了元数据实体把参数标记为必需的。 @validate装饰器把greet方法包裹在一个函数里在调用原先的函数前验证函数参数。


元数据
// 一些例子使用了reflect-metadata库来支持实验性的metadata API。 这个库还不是ECMAScript (JavaScript)标准的一部分。 然而，当装饰器被ECMAScript官方标准采纳后，这些扩展也将被推荐给ECMAScript以采纳。
// TypeScript支持为带有装饰器的声明生成元数据。
class Line {
    private _p0: Point;
    private _p1: Point;

    @validate
    @Reflect.metadata("design:type", Point)
    set p0(value: Point) { this._p0 = value }
    get p0() { return this._p0 }

    @validate
    @Reflect.metadata("design:type", Point)
    set p1(value: Point) {this._p1 = value }
    get p1() { return this._p1 }
}