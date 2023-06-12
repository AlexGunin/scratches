// import has from 'lodash/has';
// import cloneDeep from 'lodash/cloneDeep';

const cloneDeep = (obj) => {
    if(isComplicatedType(getInsance(obj))) return obj

    const result = {}

    for (const key in obj) {
        const current = obj[key]
        const temp = cloneDeep(current)
        switch (getInsance(current)){
            case 'object':
                return result[key] = temp
            case 'array':
                return result[key] = Object.values(temp)
            default:
                return result[key] = current
        }
    }
    return result
}
const isComplicatedType = (instance) => instance === 'object' || instance === 'array'

const getInsance = (value) => {
    if(value instanceof Object) return 'object'
    if(value instanceof Array) return 'array'
    return 'primitive'
}

class Enumerable{
    selectors = []
    elements = []

    constructor(arr, selectors = []) {
        this.elements = arr
        this.selectors = selectors
    }

    static wrap(arr, selectors = []){
        const result = new Enumerable(cloneDeep(arr), cloneDeep(selectors)) //?
        return result
    }
    where(key,value){
        return new Enumerable(cloneDeep(this.elements), cloneDeep([...this.selectors, {key, value}]))
    }
    all(){
        return this.selectors.reduce((acc,cur) =>{
            return acc.filter(item => {
                const {key, value} = cur
                return item[key] && item[key] === value
            })
        } , this.elements)
    }
}
// const elements = [
//     { key: 'value' },
//     { key: '' },
// ];
// const coll = Enumerable.wrap(elements);
// const result = coll.where('key', 'value'); //?
//
// result.all() //?
// [{ key: 'value' }]

    const elements = [
        { key: 'value', year: 1932 },
        { key: '', year: 1100 },
        { key: 'value', year: 32 },
        { key: 'value2', year: 32 },
    ];

    const coll = Enumerable.wrap(elements)
    const result1 = coll.where('year', 32).where('key', 'value2');
coll.all() //?

    result1.all() //?



