/// <reference path="..." />
--noResolve
//它用于声明文件间的 依赖 三斜线引用告诉编译器在编译过程中要引入的额外的文件。

/// <reference types="node" />
//declares a dependency on a package. like import 
//例如，把 /// <reference types="node" />引入到声明文件，表明这个文件使用了 @types/node/index.d.ts里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。
// For example, including /// <reference types="node" /> in a declaration file declares that this file uses names declared in @types/node/index.d.ts; and thus, this package needs to be included in the compilation along with the declaration file.


/// <reference lib="es2017.string" />
"foo".padStart(4)


/// <reference no-default-lib="true" />

/// <amd-module name="NamedModule" />
export class C {

}
//will result in amdModule.js:
// define("NamedModule", ["require", "exports"], function(require, exports) {
//     var C = (function(){
//         function C() {}
//         return C
//     })();
//     exports.C = C;
// })