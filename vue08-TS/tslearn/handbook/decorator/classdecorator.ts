@classDecorator 
class Greeter {
    property = "property"
    hello: string;
    constructor(m: string) {
        this.hello = m
    }
}
function classDecorator<T extends {new(...arg: any[]): {}}>(constructor: T) {
    return class extends constructor {
        newProperty = 'new property'
        hello = 'override'
    }
}
console.log(new Greeter('world'));


//tsc --target ES5 --experimentalDecorators .\classdecorator.ts