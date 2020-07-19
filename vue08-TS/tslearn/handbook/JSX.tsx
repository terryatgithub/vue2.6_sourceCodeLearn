// JSX
//类型断言
// var foo = <foo>bar;
//     Typescript在.tsx文件里禁用了使用尖括号的类型断言
// var foo = bar as foo;
// as 操作符在.ts/.tsx里都可用，并且与尖括号类型断言行为是等价的。

declare namespace JSX {
    interface IntrinsicElements {
        foo: any
    }
}
<foo /> 

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
<bar />
