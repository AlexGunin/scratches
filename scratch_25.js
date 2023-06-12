const contract = (fn, ...types) => (...args) => {
    if(types.length !== args.length + 1) throw new Error('Количество аргументов не совпадает c контрактом')

    args.forEach((arg, index) => {
        const type = types[index]
        if(!type || typeof type !== 'function') throw new Error(`${type} - некорректный тип для аргумента`)
        if(type(arg) !== arg) throw new Error(`Тип аргумента - ${arg} не совпадает с типом контракта - ${type.name}. Индекс аргумента - ${index}`)
    })


    const resultType = types.at(-1)
    const fnResult = fn(...args)

    if(resultType(fnResult) !== fnResult) throw new Error(`Тип результата - ${fnResult} не совпадает с контрактом - ${resultType.name}`)

    return fnResult
}

const concat = (s1, s2) => s1 + s2;
const concatStrings = contract(concat, String, String, String);
const res = concatStrings('Hello ', 'world!');


const fields = [];


const toMapId = (arr) => arr.map(id => fields[id])
const removeUnexistKeys = pipe(keys, toMapId, compact)
const selectedFields = removeUnexistKeys(fieldsContent)
