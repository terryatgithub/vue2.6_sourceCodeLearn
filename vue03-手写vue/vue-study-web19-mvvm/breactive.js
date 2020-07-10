let obj = {}

function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${obj}.${key}: ${val}`)
            return val
        },
        set(newVal) {
            console.log(`set ${obj}.${key}: ${val}`)
            if (newVal !== val) {
                val = newVal
                // update()
                observe(newVal)
            }
        }
    })
}

// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'foo-haha'


// function update() {
//     app.textContent = obj.foo
// }

// setInterval(() => {
//     obj.foo = new Date().toLocaleTimeString()
// }, 1000)

function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
obj = { foo: 'foo', bar: 'bar', baz: { a: 1 } }
observe(obj)

function set(obj, key, val) {
    defineReactive(obj, key, val)
}