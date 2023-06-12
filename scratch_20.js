const True = v1 => v2 => v1
const False = v1 => v2 => v2
const If = f => v1 => v2 => f(v1)(v2)
const Not = x => If(x)(False)(True)
const And = v1 => v2 => If(v1)(v2)(False)
const Or =
If(True)(1)(2) //?
const Pair = x => y => (f => f (x) (y))
const Fst  = p => p (True)
const Snd  = p => p (False)

And(False)(True) //?
Not(False) //?
const p = Pair (1) (2)

 p(True) //?

console.log(1 == Fst (p))
console.log(2 == Snd (p))

