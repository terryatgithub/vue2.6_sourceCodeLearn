"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 类型使用
var var1; // 类型注解
var1 = '开课吧';
// var1 = 4 // no ok
// 类型推论
var var2 = true;
// var2 = 'aaa' // no ok
// 常用：string,number,boolean,undefined,null,symbol,any
// 结合数组使用
var arr;
arr = ['tom', 'jerry'];
// 任意类型
var varAny;
varAny = 'xx';
varAny = 2;
// any也可以用于数组
var arrAny;
arrAny = [1, true, 'free'];
arrAny[1] = 100;
// 函数中的类型约束
function greet(person) {
    return 'hello' + person;
}
// void类型
function warn() {
    // 无需return了
}
var aliasType = {
    foo: 'foo',
    bar: 'bar'
};
// 联合类型
var union;
union = '1';
union = 1;
// 函数
// 必填参数
// ?可选参数
function greeting(person, msg) {
    if (msg === void 0) { msg = ''; }
    return 'hello:' + person;
}
greeting('tom');
greeting('jerry');
// 实现
function watch(cb1, cb2) {
    if (cb1 && cb2) {
        console.log('重载2');
    }
    else {
        console.log('重载1');
    }
}
// class使用
// 03-class.ts
var Parent = /** @class */ (function () {
    // 参数属性：构造函数参数加修饰符，能够定义为成员属性
    function Parent(tua) {
        if (tua === void 0) { tua = "tua"; }
        this.tua = tua;
        this._foo = "foo"; // 私有属性，不能在类的外部访问
        this.bar = "bar"; // 保护属性，可以在子类中访问
    }
    // 方法也有修饰符
    Parent.prototype.someMethod = function () { };
    Object.defineProperty(Parent.prototype, "foo", {
        // 存取器：属性方式访问，可添加额外逻辑，控制读写性
        get: function () {
            return this._foo;
        },
        set: function (val) {
            this._foo = val;
        },
        enumerable: false,
        configurable: true
    });
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Child;
}(Parent));
var child = new Child();
var parent2 = new Parent();
parent2.foo;
// 装饰器
var Foo = /** @class */ (function () {
    function Foo() {
        this.bar = 'bar';
    }
    Foo.prototype.setBar = function (val) {
        this.bar = val;
    };
    __decorate([
        rec
    ], Foo.prototype, "setBar", null);
    Foo = __decorate([
        log(window.alert)
    ], Foo);
    return Foo;
}());
// 类装饰器参数是装饰的class
function log(fn) {
    return function (target) {
        // console.log(typeof target);
        target.prototype.log = function () {
            fn(this.bar);
        };
    };
}
// 参数1是Foo实例
function rec(target, name, descriptor) {
    // 这里通过修改descriptor.value扩展了bar方法
    var baz = descriptor.value;
    descriptor.value = function (val) {
        console.log('run method', name);
        baz.call(this, val);
    };
}
var foo = new Foo();
// @ts-ignore
foo.log();
//# sourceMappingURL=ts-test.js.map