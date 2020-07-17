//Global Variables
declare var foo: number;
declare const bar: number;
declare let baz: number;

//Global functions
declare function greet(greeting: string): void;

//objects with properties
declare namespace myLib {
    function makeGreeting(s: string): string;
    let numberOfGreetings: number;
}

//overloaded functions 
declare function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];

//reusable types(interfaces)
interface GreetingSettings {
    greeting: string;
    duration?: number;
    color?: string;
}
declare function greet(setting: GreetingSettings): void;

//reusable types(type aliases)
type GreetingLike = string | (() => string) | Greeter;
declare function greet(g: GreetingLike): void;

//Organization Types
declare namespace GreetingLib {
    interface LogOptions {
        verbose?: boolean;
    }
    interface AlertOptions {
        modal: boolean;
        title?: string;
        color?: string;
    }
}
//also create nested namespaces in one declaration:
declare namespace GreetingLib.Options {
    //refer to via GreetingLib.Options.Log
    interface Log {
        verbose?: boolean;
    }
    interface Alert {
        modal: boolean;
        title?: string;
        color?: string;
    }
}

//classes
declare class Greeter {
    constructor(greeting: string);

    greeting: string;
    showGreeting(): void;
}
    //code
    const myGreeter = new Greeter('hello, world')
    myGreeter.greeting = 'howdy'
    myGreeter.showGreeting()
    //or
    class SpecialGreeter extends Greeter {
        constructor() {
            super('very special greetings.')
        }
    }

