interface Person {
    firstName: string,
    lastName: string
}
//通过接口定义结构

//函数通过Person接口约束参数结构
function greeting(person: Person): string {
    return 'hello' + person.firstName + person.lastName
}

greeting({firstName: 'terry', lastName: 'ha'})
// greeting({firstName: 'hal'})