import { __decorate, __extends } from "tslib";
import { Component, Prop, Vue } from 'vue-property-decorator';
var HelloWorld = /** @class */ (function (_super) {
    __extends(HelloWorld, _super);
    function HelloWorld() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = 'abc';
        return _this;
    }
    HelloWorld.prototype.onclick = function () {
        console.log('click', this);
    };
    HelloWorld.prototype.render = function (h) {
        // jsx
        return <div class="hello">
      <h1 onClick={this.onclick}>{this.msg}</h1>
      <input type="text" v-model={this.title}/>
    </div>;
    };
    __decorate([
        Prop()
    ], HelloWorld.prototype, "msg", void 0);
    HelloWorld = __decorate([
        Component
    ], HelloWorld);
    return HelloWorld;
}(Vue));
export default HelloWorld;
//# sourceMappingURL=TsxComp.jsx.map