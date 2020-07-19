import { __decorate, __extends } from "tslib";
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from './index';
// 动态注册模块
var CounterModule = /** @class */ (function (_super) {
    __extends(CounterModule, _super);
    function CounterModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 1;
        return _this;
    }
    CounterModule.prototype.add = function () {
        // 通过this直接访问count
        this.count++;
    };
    Object.defineProperty(CounterModule.prototype, "doubleCount", {
        // 定义getters
        get: function () {
            return this.count * 2;
        },
        enumerable: false,
        configurable: true
    });
    CounterModule.prototype.asyncAdd = function () {
        var _this = this;
        setTimeout(function () {
            // 通过this直接访问add
            _this.add();
        }, 1000);
    };
    __decorate([
        Mutation
    ], CounterModule.prototype, "add", null);
    __decorate([
        Action
    ], CounterModule.prototype, "asyncAdd", null);
    CounterModule = __decorate([
        Module({ dynamic: true, store: store, name: 'counter', namespaced: true })
    ], CounterModule);
    return CounterModule;
}(VuexModule));
// 导出模块应该是getModule的结果
export default getModule(CounterModule);
//# sourceMappingURL=counter.js.map