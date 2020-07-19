
//装饰器是工厂函数
//它能访问和修改被装饰的目标

//类装饰器
//类装饰器表达式会在运行时当做函数被调用，类的构造函数作为其唯一参数
function log(target: Function) {
    target.prototype.log = function() {
        console.log(target === Foo);
        console.log(this.bar);
    }
}

//方法装饰器
function rec(target: any, key: string, descriptor: PropertyDescriptor) {
    //这里通过修改descriptor.value扩展了bar方法
    const fn = descriptor.value
    descriptor.value = function(val: string){
        console.log('run method: ' + key);
        fn.call(this, val)
    }
}

//属性装饰器
function mua(val: string){
    return function(target: any, name: string) {
        target[name] = val
    }
}

@log //类装饰器
class Foo {
    bar = 'bar'
    @mua('muahaha') ns!: string

    @rec //方法装饰器
    setBar(val: string) {
        this.bar = val
    }
}

const foo = new Foo() 
// @ts-ignore
foo.log()
foo.setBar('bar lala')
console.log(foo.ns);

