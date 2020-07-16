const msg = 'Typescript' //类型推断

function sayHello(msg: string) {
    return "Hello, " + msg
}

document.body.textContent = sayHello(msg)