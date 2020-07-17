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
装饰器;
function sealed(target) {
}
装饰器工厂;
function color(value) {
    return function (target) {
    };
}
装饰器组合;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () {
    };
    __decorate([
        f(),
        g()
    ], C.prototype, "method", null);
    return C;
}());
同样的;
在TypeScript里;
当多个装饰器应用在一个声明上时会进行如下步骤的操作;
由上至下依次对装饰器表达式求值;
求值的结果会被当作函数;
由下至上依次调用;
装饰器求值;
类中不同声明上的装饰器将按以下规定的顺序应用;
参数装饰器;
然后依次是方法装饰器;
访问符装饰器;
或属性装饰器应用到每个实例成员;
参数装饰器;
然后依次是方法装饰器;
访问符装饰器;
或属性装饰器应用到每个静态成员;
参数装饰器应用到构造函数;
类装饰器应用到类;
类装饰器;
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "hello, " + this.greeting;
    };
    Greeter = __decorate([
        sealed
    ], Greeter);
    return Greeter;
}());
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
var Greeter = /** @class */ (function () {
    function Greeter(m) {
        this.property = "property";
        this.hello = m;
    }
    Greeter = __decorate([
        classDecorator
    ], Greeter);
    return Greeter;
}());
function classDecorator(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.newProperty = 'new property';
            _this.hello = 'override';
            return _this;
        }
        return class_1;
    }(constructor));
}
console.log(new Greeter('world'));
