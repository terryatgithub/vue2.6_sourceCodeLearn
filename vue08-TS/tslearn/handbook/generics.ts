//类型变量
function identify<T>(arg: T): T {
    return arg
}

//两种使用方法
//1. 
let output = identify<string>('myString')
//2. 利用类型推论
let output = identify('myString')

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg
}
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg
}

//泛型函数
function identify<T>(arg: T): T {
    return arg;
}
let myIdentity: <T>(arg: T) => T = identify; //myIdentity是函数变量，类型为identity相同
let myIdentity: <U>(arg: U) => U = identity;
let myIdentity: {<T>(arg: T): T} = identity;
//泛型接口，把上面例子里的对象字面量拿出来作为一个接口：
interface GenericIdentityFn {
    <T>(arg: T): T;
}
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: GenericIdentityFn = identity
//我们可能想把泛型参数当做整个接口的一个参数，这样我们就能清楚的知道使用的具体是哪个泛型类型（比如Dictionary<string>而不只是Dictionary)
//这样接口里的其它成员也能知道这个参数的类型
interface GenericIdentityFn<T> {
    (arg: T): T;
}
function identity<T>(arg: T): T{ 
    return arg
}
let myIdentity:GenericIdentityFn<number> = identity

//泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) { return x + y }
// 与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。
// 我们在类那节说过，类有两部分：静态部分和实例部分。 
// 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
// 注意：无法创建‘泛型枚举‘和’泛型命名空间‘

//泛型约束
//1. 定义一个接口来描述约束条件，创建一个包含length属性的接口，使用这个接口和extends关键字来实现约束
interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg
}

//在泛型约束中使用类型参数


//在泛型里使用类类型
// 在ts使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<T>(c: {new(): T;}): T {
    return new c()
}
//一个更高级的例子，使用原型属性推断、并约束构造函数和类实例的关系：
class BeeKeeper {
    hasMask: boolean;
}
class zooKeeper {
    nameTag: string;
}

class Animal {
    numLegs: number;
}
class Bee extends Animal {
    keeper: BeeKeeper
}
class Lion extends Animal {
    keeper: zooKeeper
}
//约束构造函数和实例的关系
function createInstance<A extends Animal>(c: new() => A): A {
    return new c();
}
//原型属性推断
createInstance(Lion).keeper.nameTag
createInstance(Bee).keeper.hasMask
