import { sayHello } from './greet'

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName)
    elt.innerHTML = sayHello(name)
}

showHello('greeting', 'TypeScript watched 111')
