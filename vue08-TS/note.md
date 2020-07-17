# Vue+TS实践
暗号： you can you up

1. ts核心语法
## 类型注解和编译时类型检查
### 类型注解
//类型注解
//类型推断
//常见类型
string boolean number undefined null 
//类型数组
let arr: string[]
//任意类型 any 可以任意赋值，没有任何约束
let varAny: any;
let arrAny: any[];
//函数中类型约束 约束形参类型、返回值类型
function greet(person: string): string {
    return 'hello' + person
}
function warn(): void{}

//类型别名 type
let objType: {foo: string, bar: number};
objType = {
    foo: 'foo',
    bar: 123
}
//type alias和interface大多数情况下可以互换，具体差别可以看官方说明
type FooBar = {foo: string, bar: number}
let objType: FooBar;
interface FooBar {
    foo: string,
    bar: number
}

//联合类型 union type
let union: string | number | boolean;
union = 'nihao'
union = 1

//交叉类型
type First = {first: number}
type Second = {second: number}
type FirstAndSecond = First & Second //交叉类型，2个都要有

### 函数
//必填参数: 形参一旦声明，必须传递
//可选参数：? 表明参数是可选的
//可选参数要放在必选参数后面
function greeting(person: string, age?: number): string {
    return 'hello' + person
}
//函数重载  以函数参数数量或类型，或返回值的类型来区分多个同名函数
//先声明，再实现
function watch(cb1: ()=>void): void //重载声明1
function watch(cb1: ()=>void, cb2: (v1:any, v2:any)=>void): void //重载声明2
//最后必须实现
function watch(cb1: ()=>void, cb2?: (v1:any, v2:any)=>void): void {
    if(cb2) {
        cb2()//执行重载2
    } else {
        cb1() //执行重载1
    }
}

### 类
存取器作为计算属性使用
get total(){
    return this.features.length
}


### 泛型
ts很有内涵，越写越喜欢

### 声明文件
对js写的文件，要有.d.ts来说明类型

### 装饰器
@Prop 轻盈飘逸 越用越喜欢
装饰器就是个函数

### 状态管理推荐使用 vuex-module-decorators









!: 非空断言，必须要有值





# 2. ts+vue
vue中声明组件有3种方式：
1. class-style    基于class 
```javascript
    type Feature = {
        id: number;
        name: string;
    }
    @Component
    export default class HelloWorld extends Vue {
        @Prop() private msg!: string;

        //属性会成为data中数据
        features: Feature[] = [
            { id: 1, name: '类型注解'}, 
            { id: 2, name: 编译类型语言' }
        ]

        addFeature(e: KeyboradEvent) {
            //类型断言 程序员比编译器更知道目前的变量类型
            const inp = e.target as HTMLInputElement
            const feature: FeatureSelect = {
                id: this.features.length + 1,
                name: inp.value,
                selected: true
            }
            this.features.push(feature)
        }

        //声明周期函数，直接写同名函数即可
        created() {

        }

    }
```

2. option-style(不推荐)
    用Vue.extend()，
    缺点：稍微有点问题，vue官方说支持不是很好，主要是this的出现导致ts很难推断
    export default Vue.extend({
        data() {
        }
    })

3. 用tsx方式来写（跟React JSX很像，这种方式更新颖、更方便）
    新建文件TsxComp.tsx，然后直接用JSX来写



# 3. 装饰器应用 