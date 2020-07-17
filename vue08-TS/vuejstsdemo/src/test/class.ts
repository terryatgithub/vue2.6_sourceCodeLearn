class Parent {
    private _foo = "foo"; 
    protected bar = "bar"; 

    //参数属性： 构造函数的参数加修饰符，可以定义为成员属性
    constructor(public tua = "tua") {
    }

    //方法也可以有修饰符
    private someMethod(){

    }

    //存取器：属性方式访问，可额外添加逻辑，控制读写性
    get foo(){
        return this._foo
    }
    set foo(val) {
        this._foo = val
    }
}