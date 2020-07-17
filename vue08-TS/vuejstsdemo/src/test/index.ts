let var1: string;
var1 = 'kkb'
// var1 = 1 //error

let var2 = true //type infer

//string number boolean undefined null symbol
let arr: string[];
arr = ['tom', 'terr']
// arr = [1,2,3]

let arrAny: any[]
arrAny = [1, true, 'haha']
arrAny[0] = 100

function greet(person: string): string {
    return 'hello' + person
}
// greet()
greet('terry')

function warn():void {}

//类型别名
let objType : { foo: string, bar: string};
type FooBar = { foo: string, bar: string}
let aliasType: FooBar;

//联合类型
let union: string | number;
union = 1
union = 'hah'
// union = true

//交叉类型
type First = { first: number }
type Second = { second: number }
type FirstAndSecond = First & Second;
let fs: FirstAndSecond;
fs = {
    first: 1, 
    second: 2
}

