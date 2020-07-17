//number boolean string symbol and object
function reverse(s: string): string;

//callback types :
//return types of callbacks //prefer  void not any
function fn(x: () => void) {
    x()
}
//Optional Parameters in callbacks
//Do write callback parameters as non-optional
interface Fetcher {
    getObject(done: (data: any, elapsedTime: number) => void): void;
}
//Overloads and Callbacks
//Do white a single overload using the maximum arity:
declare function beforeAll(action: (done: doneFn) => void, timeout?: number): void;

//Function Overloads
//Ordering: 更具体的签名函数放在前面
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElm: HTMLDivElement;
var x = fn(myElm) //x: string

//use optional parameters
//do use the optional parameters whenever possible
interface Example {
    diff(one: string, two?: string, three?: boolean): number;
}

//use Union Types
//do use union types whenever possible
//this is important for people who are passing through a value to your function:
interface Moment {
    utcOffset(): number;
    utcOffset(b: number|string): Moment;
}
function fn(x: number|string) {
    return moment().utcOffset(x)
}



