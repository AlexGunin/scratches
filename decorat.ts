class SomeService {
  @Logger
  public test(a , b) {
    return a + b
  }
}


const createStr = (target, method, time, args, result) => {
  return `${target.constructor.name}.${method}: ${time}ms
    arguments: [${args}]
    result: ${result}
  `
}

function Logger(target, propertyName, descriptor) {
    const method = target[propertyName];
    target[propertyName] = function(...args) {
      const startTime = Date.now()
      const result = method(...args)
      const endTime = Date.now()
      console.log(createStr(target, propertyName, endTime - startTime, args, result))
      return result
    }

    return descriptor
}



const obj = Object.freeze({})

const oldConsole = console

type NonNegativeNumber = number as const;

const a: NonNegativeNumber = 10
const b: NonNegativeNumber = -10

// console.log(1)
console.log(obj == '1')
