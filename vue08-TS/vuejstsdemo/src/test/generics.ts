import { Feature } from "../types";

//不用泛型
interface Result1 {
    ok: 0 | 1,
    data: Feature []
}
//使用泛型
interface Result<T> {
    ok: 0 | 1,
    data: T
}
//泛型方法
function getResult<T>(data: T): Result<T> {
    return {
        ok: 1, 
        data
    }
}
//用尖括号指定T为string
getResult<string>('hello')
//用类型推断指定T为number
getResult(1)

// 泛型优点：
// 1. 函数和类可以支持多种类型，更通用
// 2. 不必编写多条重载、冗长的联合类型，可读性好
// 3. 灵活控制类型约束
// 不仅通用且能灵活控制，广泛应用于通用库的编写