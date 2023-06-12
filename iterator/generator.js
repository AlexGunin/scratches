// const Tree = (value, left, right) => ({
//   value,
//   left,
//   right,
//   *[Symbol.iterator]() {
//     yield this.value;
//
//     if (this.left) yield* this.left;
//
//     if (this.right) yield* this.right;
//   },
// });
//
// //    2
// //   3 4
// // 5 6 7 8
//
// const test = Tree(2, Tree(3, Tree(5), Tree(6)), Tree(4, Tree(7), Tree(8)));
//
// console.log([...test]);
//
// function* intoIter(value) {
//   if (value == null) return;
//
//   if (value[Symbol.iterator] != null) {
//     yield* Symbol.iterator();
//     return;
//   }
//
//   if (typeof value === "object") {
//     for (const key in value) {
//       yield value[key];
//       return;
//     }
//   }
//
//   yield value;
//   return;
// }
//
// const foo = (data) => {
//   const iter = intoIter(data);
//   for (const el of iter) {
//     console.log(el);
//   }
// };
//
// foo();
//
// function* take(iter, n) {
//   for (const el of iter) {
//     n--;
//     if (n < 0) return;
//
//     yield el;
//   }
// }
//
// function* filter(iter, fn) {
//   for (const el of iter) {
//     if (fn(el)) yield el;
//   }
// }
//
// function iter(iter) {
//   for (const el of iter) {
//     console.log(el);
//   }
// }
//
// console.log(
//   iter(
//     take(
//       filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (value) => value % 2 === 0),
//       5
//     )
//   )
// );



// class MyIterator {
//
//     iter = undefined
//
//     constructor(iter) {
//         this.iter = iter
//     }
//
//     *[Symbol.iterator]() {
//         yield* this.iter
//     }
//
//     *filter(pred) {
//         const {iter} = this
//         console.log('ITER')
//
//         const tempIter = (function* (){
//             console.log('TEMP ITER')
//             for (const el of iter) {
//                 if (pred(el)) yield el;
//             }
//         }())
//
//         console.log('TEMP ITER', tempIter)
//
//         return new MyIterator(tempIter)
//     }
//
//     *map(fn) {
//         const {iter} = this
//
//         const tempIter = (function*(){
//             for (const el of iter) {
//                 yield fn(el)
//             }
//         })()
//
//         return new MyIterator(tempIter)
//
//     }
//
//     *take(num) {
//         const {iter} = this
//
//         const tempIter = (function*(){
//             for (const el of iter) {
//                 num--
//                 if(num < 0) return
//
//                 yield(el)
//             }
//         })()
//
//         return new MyIterator(tempIter)
//
//     }
//
//     resolve() {
//         return [...this.iter]
//     }
// }
//
//
// const testIter = new MyIterator([1,2,3,4])
// console.log(testIter.filter((el) => el > 2)) //?
// console.log([...testIter.filter((value ) => value > 1).map(value => value * 2).take(2)])//?


// console.log(1)
//
//
// const testAsync = async () => {
//     console.log(2)
//
//     await Promise.resolve(1)
//
//     console.log(3)
// }
//
// testAsync()
//
// console.log(4)



// function* fetchSomething(value) {
//     try {
//         console.log('1')
//         const a = yield 1
//         console.log('2', a)
//         const b = yield a + 1
//         console.log('3', b)
//         return [a,b]
//     } catch(err) {
//         console.log('CATCH')
//         return []
//     }
//
// }


// function executor(iter, value) {
//     const res = iter.next(value)
//     const promise = Promise.resolve(res.value)
//
//     if(res.done) {
//         return promise
//     }
//
//     return promise.then((val) => executor(iter, val), (err) => {
//         const res = iter.throw(err)
//         if(res.done) {
//             return res.value
//         }
//
//         return executor(iter, res.value)
//     })
// }

// console.log('4')
// executor(fetchSomething()).then((value) => {
//     console.log('6')
// })
// console.log('5')



function* _forEach(iter, fn) {

    let time = Date.now()
    const MAX_TIME = 150

    for (const el of iter) {
        yield fn(el)

        console.log('TIME WORK', Date.now() - time)

        if(Date.now() - time > MAX_TIME) {
            yield null
            time = Date.now()
        }
    }
}

const sleep = (time) => new Promise((res) => {
    console.log('SLEEEEEP', time)
    setTimeout(res, time)
})

const executorWithSleep = async (iter, value) => {
    const res = iter.next(value)
    // console.log('RES', res)
    const promise = Promise.resolve(res.value)
    console.log('PROMISE', promise)
    if(res.done) {
        return promise
    }

    return promise.then(async (val) => {
        if(res.value === null) {
            await sleep(100)
            return executorWithSleep(iter, val)
            // return sleep(100).then(()=> )
        }

        return executorWithSleep(iter, val)
    }, (err) => {
        const res = iter.throw(err)
        if(res.done) {
            return res.value
        }

        return executorWithSleep(iter, res.value)
    })
}

const forEach = (...args) =>  executorWithSleep(_forEach(...args))

const BIG_ARRAY = new Array(1e4).fill(null).map((_, index) => index)

forEach(BIG_ARRAY, console.log)

console.log('AFTER FOR EACH')

// const timeout = (time) => {
//     const timer = setTimeout(() => {
//         console.log('TIME IN TIMEOUT', time)
//         clearTimeout(timer)
//         timeout(time * 2)
//     } , time)
// }
//
// timeout(50)
//
// console.log('AFTER TIMEOUT')
