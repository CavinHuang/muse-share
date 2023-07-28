const prototype = Object.prototype

console.log(prototype.toString.call('111'))
console.log(prototype.toString.call(111))
console.log(prototype.toString.call(() => {}))
console.log(prototype.toString.call(new Date()))
console.log(prototype.toString.call({ a: 1 }))
console.log(prototype.toString.call(null))
console.log(prototype.toString.call(new Map()))
