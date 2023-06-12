


// const test = () => {
//     const array = new Array(1e3).fill(null).map((_, i) => i)
//     const iter = createMessagesIterator(array, 100)
//     let counter = 0
//     console.log(iter) //?
//     for (const chunk of iter) {
//         console.log(chunk)
//         counter++
//     }
//     counter
// }
//
// test()


function test(value) {
    console.log(this.author, value)
}
// test()
// const test2 = test.bind(null)
// test2()

const test2 = (value, value2) => {
console.log(this.author, value, value2)
}

const bind = (fn, context, ...args) => (...otherArgs) => {
    const symbol = Symbol('bind')
    const fnContext = typeof context === 'object' && context !== null ? context : {}
    fnContext[symbol] = fn

    return fnContext[symbol](...args, ...otherArgs)
}

const test3 = bind(test2, {author: 'Alex'}, 1)
test3(2)
